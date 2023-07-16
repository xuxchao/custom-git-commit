import inquirer from "inquirer";
import { execa } from "execa";
import chalk from "chalk";

const { stdout } = await execa("git", ["status", "-s"]);
const commitNumber = stdout.split("\n").length;
if (commitNumber === 0) {
  console.log(chalk.red("当前没有需要提交的文件"));
  process.exit(0);
}
const result = await inquirer.prompt<{
  gitType: string;
  message: string;
}>([
  {
    type: "list",
    name: "gitType",
    message: `当前有${commitNumber}个文件需要提交。` + "请选择一个提交类型:",
    choices: [
      {
        name: "feat:      一个新的功能",
        value: "feat",
      },
      {
        name: "fix:       修复了一个bug",
        value: "fix",
      },
      {
        name: "docs:      只有文档改变了",
        value: "docs",
      },
      {
        name: "style:     只改变了样式",
        value: "style",
      },
      {
        name: "test:      添加了测试用例",
        value: "test",
      },
    ],
  },
  {
    type: "input",
    name: "message",
    message: "请输入提交信息:",
  },
]);
console.log(result);
