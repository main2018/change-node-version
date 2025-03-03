/*
 * @Author: haobin.wang
 * @Date: 2025-02-13 15:14:12
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-02 23:56:24
 * @Description: 校验node版本
 */
const semver = require('semver');
const chalk = require('chalk');
const { exec, execSync } = require('child_process');

const currentVersion = process.version;

function existsPackage(packageName) {
  // exec(`command -v ${packageName}`, (error, stdout, stderr) => {
  //   if (error) {
  //     // console.log(error, 'nvm 未安装');
  //     return;
  //   }
  //   // if (stdout.trim()) {
  //   //   console.log(`nvm 已安装，路径为: ${stdout.trim()}`);
  //   // } else {
  //   //   console.log('nvm 未安装');
  //   // }
  // });
  try{
    const stdout = execSync(`command -v ${packageName}`).toString();
    // console.log(`nvm 已安装，路径为: ${stdout.trim()}`);
    return true
  } catch (error) {
    // console.log(error, 'nvm 未安装');
    return false
  }
}
function switchVersion({targetVersion, script, setDefault}) {
  // console.log("准备切换版本");
  if (!existsPackage('nvm')) {
    log({message: `nvm 未安装，请先安装 nvm。`})
    return;
  }
  const loadNvmCommand = `source $NVM_DIR/nvm.sh`;
  // exec(`source ~/.nvm/nvm.sh && nvm use ${targetVersion}`, (err, stdout, stderr) => {
  // exec(`${loadNvmCommand} && nvm use ${targetVersion}`, (err, stdout, stderr) => {

  // 获取当前 Shell
  const shell = process.env.SHELL || 'zsh';
  try {
    // execSync(`${shell} -c "source ~/.nvm/nvm.sh && nvm use ${targetVersion} && ${shell}"`, { stdio: 'inherit', shell: true });
    // execSync(`${shell} -c "source ~/.nvm/nvm.sh && nvm use ${targetVersion} && echo 'Node.js 版本已切换为 ${targetVersion}' && ${shell}"`, { stdio: 'inherit', shell: true });
    execSync(`${shell} -c "source ~/.nvm/nvm.sh && nvm use ${targetVersion} && echo 'Node.js 版本已切换为 ${targetVersion}' && npm run ${script}"`, { stdio: 'inherit', shell: true });
    // 新的 Shell 是一个交互式环境，execSync 会一直阻塞，直到你手动退出新的 Shell，因此直接在 execSync 后输出成功信息是不可行的
    // 这里的代码会在你退出新的 Shell 后执行《当你退出新的 Shell（例如输入 exit 或按 Ctrl+D），父进程的代码会继续执行》
    // log({color: 'green', message: `已退出新的 Shell，切换完成。`})
    // log({color: 'green', message: `Node.js 版本已切换为 ${targetVersion}`})
    if (setDefault) {
      execSync(`nvm alias default ${targetVersion}`, { stdio: 'inherit', shell: true });
      log({color: 'green', message: `Node.js 版本 ${targetVersion} 已设置为默认版本`})
    }
  } catch (err) {
    // console.error(err, stderr, 444444);
    // exec(`${loadNvmCommand} && nvm install ${targetVersion}`, (err, stdout, stderr) => {
    //   if (err) {
    //     // console.error(err, stderr, 555555);
    //     log({message: `安装 Node 版本 ${targetVersion} 失败:\n  ${stderr}`})
    //     return;
    //   }

    //   // console.log(stdout);
    // });
    const processInstall = exec(`${loadNvmCommand} && nvm install ${targetVersion}`, (err, stdout, stderr) => {
      if (err) {
        log({message: `安装 Node 版本 ${targetVersion} 失败:\n  ${stderr}`})
        return;
      }
      // console.log(`成功: ${data}`);
      switchVersion(targetVersion)
    });
    processInstall.stdout.on("data", (data) => {
      console.log(`${data}`);
    });
    processInstall.stderr.on("data", (data) => {
      console.error(`${data}`);
    });
    processInstall.on("close", (code) => {
      // if (code === 0) {
      //   console.log("✅ 命令执行成功", code);
      // } else {
      //   // console.error(`❌ 命令执行失败，退出码: ${code}`);
      //   log({message: `安装 Node 版本 ${targetVersion} 失败:\n  ${stderr}`})
      // }
    });
  }
}

function log({type = 'error', color = 'red', message} = {}) {
  console[type](
    chalk[color].bold(message),
  );
}
function exit() {
  process.exit(1)
}

/**
 * 
 * @param {Object} param0
 * @param {String} param0.version
 * @param {String} param0.script
 * @param {Boolean} param0.default
 */
module.exports =  function checkNodeVersion({version: targetVersion = '20.18.x', script, default: setDefault} = {}) {
  if (!semver.satisfies(currentVersion, targetVersion)) {
    // console.error(
    //   chalk.red.bold(
    //     `当前 Node 版本为 ${currentVersion}，但项目需要 Node 版本为 ${targetVersion}。请修改 Node 版本。`,
    //   ),
    // );
    log({color: 'yellow', message: `当前 Node 版本为 ${currentVersion}，但项目需要 Node 版本为 ${targetVersion}。尝试切换版本。`})
    switchVersion({targetVersion, script, setDefault});
    // process.exit(1);
  }
}