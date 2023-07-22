import { defineConfig } from "./types";

export default defineConfig({
  command: [
    {
      type: "shell",
      flags: "-s --status",
      desc: "查看当前状态",
      shells: "git status -s",
    },
    {
      type: "shell",
      flags: "-l --log",
      desc: "查看 log 日志",
      shells: "ls",
    },
    {
      type: "shell",
      flags: "--export",
      desc: "配置 https 代理，代理端口为 7890",
      shells: "export https_proxy=http://127.0.0.1:7890",
    },
    {
      type: "shell",
      flags: "--win",
      desc: "配置 https 代理，代理端口为 7890",
      shells: "set HTTPS_PROXY=http://127.0.0.1:7890",
    },
    {
      type: "shell",
      flags: "-b --branch",
      desc: "删除远程不存在的分支和本地已经合并过的分支",
      shells: [
        "export https_proxy=http://127.0.0.1:7890",
        "git fetch -p",
        // "git branch --merged main | grep -v '^[ *]*master$' | xargs git branch -d",
      ],
    },
  ],
});
