import { $ } from "execa";
import { consola } from "consola";
import { program } from "commander";
import targetPack from "./package.json";
import { loadConfig } from "unconfig";
import { Config } from "./types";

const regShellKey = /--([a-zA-Z]*)/;

async function main() {
  const {
    config: { command: commandItemShells },
  } = await loadConfig<Config>({
    sources: [
      {
        files: "custom.config",
      },
    ],
    merge: false,
  });

  const shellMap = new Map<string, string | string[]>();
  const command = program
    .name(targetPack.name)
    .description("通过用户的配置快速执行命令");
  commandItemShells.forEach((shell) => {
    const key = shell.flags.match(regShellKey);
    if (key === null) {
      return consola.error(`命令:${shell.flags}书写错误`);
    }
    shellMap.set(key[1], shell.shells);
    command.option(shell.flags, shell.desc);
  });
  command
    .version(targetPack.version, "-v, --version", "当前项目的版本")
    .parse(process.argv);

  const params = program.opts<Record<string, boolean>>();
  const paramsKeys = Object.keys(params);
  for (const key of paramsKeys) {
    let shells = shellMap.get(key);
    if (!shells) return;
    if (!Array.isArray(shells)) {
      shells = [shells];
    }
    // const script = `
    //   #!/bin/bash
    //   ${shells.join("&&")}
    // `;
    // await $({ stdio: "inherit" })`bash -c ${script}`;
    // consola.success(`命令: ${shells.join("&&")} 执行成功`);

    for (const shell of shells) {
      const script = `
        #!/bin/bash
        ${shell}
      `;
      await $({ stdio: "inherit" })`bash -c ${script}`;
      consola.success(`命令: ${shell} 执行成功`);
    }
  }
  process.exit();
}

main();
