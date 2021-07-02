const inquirer = require("inquirer");
const Git = require("git-rev-sync");
const { spawn } = require("child_process");
const ora = require("ora");
const chalk = require("chalk");
(async function publish() {
  const msg = await gitCommitMsg();
  try {
    await gitExcute(msg);
  } catch (e) {
    console.log(e.code);
    if (e.code === 128) {
      await spawn([".git/index.lock"], "rm");
    }
    await gitExcute(msg);
  }
})();

async function gitExcute(msg) {
  await excute(["add", "."]);
  await excute(["commit", "-m", msg]);
  await excute(["push", "--set-upstream", "origin", Git.branch()]);
}

async function excute(params, command = "git") {
  return new Promise((resolve) => {
    const spinner = ora(chalk.yellow(params.join(" ")) + "\n").start();
    const task = spawn(command, params, {
      cwd: process.cwd(),
      stdio: "inherit",
    });
    if (task.stdout) {
      task.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });
    }

    if (task.stderr) {
      task.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });
    }
    task.on("close", (code) => {
      if (code) {
        const e = new Error("command execute failed");
        e.code = code;
        throw new Error(e);
      }
    });
    task.on("exit", (e) => {
      spinner.stop();
      resolve(e);
    });
  });
}
async function gitCommitMsg() {
  const { msg } = await inquirer.prompt([
    {
      type: "input",
      name: "msg",
      message: "commit msg",
      default: "update files",
    },
  ]);
  return msg;
}
