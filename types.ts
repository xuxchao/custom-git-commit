export interface CommandItemShell {
  type: "shell";
  flags: string;
  desc: string;
  shells: string | string[];
}

export interface Config {
  command: CommandItemShell[];
}

export function defineConfig(params: Config) {
  return params;
}
