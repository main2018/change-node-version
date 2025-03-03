#!/usr/bin/env node
// change-node-version 20.18.0 -d

const shell = require('shelljs');
const { program } = require('commander');
const  checkNodeVersion = require('./checkNodeVersion');

// // 检查是否安装了 nvm
// function checkNvmInstalled() {
//   if (!shell.which('nvm')) {
//     shell.echo('Sorry, this script requires nvm (Node Version Manager)');
//     shell.exit(1);
//   }
// }

// // 更改 Node.js 版本
// function changeNodeVersion(version, setDefault) {
//   checkNvmInstalled();

//   shell.exec(`nvm install ${version}`);

//   if (setDefault) {
//     shell.exec(`nvm alias default ${version}`);
//     shell.echo(`Set Node.js ${version} as default version.`);
//   }

//   shell.echo(`Changed Node.js version to ${version}`);
// }

// 设置命令行参数
// console.log(process.argv, 11111);

program
  .version('0.0.1')
  .description('A CLI tool to change Node.js version with nvm')
  .argument('<version>', 'The Node.js version to switch to') // 改成[version]是可选参数
  .requiredOption('-s, --script <string>', '切换后要执行的脚本名称')
  .option('-d, --default', 'Set this version as default', false)
  .action((version, options) => {
    // console.log(version, options, 9999999);
    // changeNodeVersion(version, options.default);
    checkNodeVersion({version, ...options});
  })
  .parse(process.argv);

const options = program.opts();
// console.log(process.argv, options);

// 调用函数更改 Node.js 版本
// changeNodeVersion(options.version, options.default);

// module.exports = changeNodeVersion;