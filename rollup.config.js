import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";
// import { babel } from "@rollup/plugin-babel";

/** @type {import('rollup').Config} */
export default {
  // input: "ccc.js",
  input: "index.ts",
  output: [
    {
      file: `bin/index.js`, // 输出文件路径
      format: "es", // 输出格式为 es
      banner: "#!/usr/bin/env node",
    },
  ],

  plugins: [
    resolve(), // 解析 Node.js 模块依赖
    commonjs(), // 将 CommonJS 模块转为 ES6+ 模块
    typescript(), // 编译 TypeScript
    terser(),
    json(),
    // babel({ babelHelpers: "bundled", extensions: ["ts", "js"] }),
  ],
  external: ["inquirer", "execa", "chalk"],
};
