const inquirer = require("inquirer");
const Git = require("git-rev-sync");
const { spawn } = require("child_process");

gitCommit();
async function gitCommit() {
  const msg = await gitCommitMsg();
  try {
    await gitExcute(msg);
  } catch (e) {
    console.log(e.code);
    if (e.code === 128) {
      await gitAdd(["rm", "-rf", ".git/index.lock"]);
    }
    await gitExcute(msg);
  }
}
async function gitExcute(msg) {
  await gitAdd(["add", "."]);
  await gitAdd(["commit", "-m", msg]);
  await gitAdd(["push", "--set-upstream", "origin", Git.branch()]);
}

async function gitAdd(params) {
  const task = spawn("git", params, {
    cwd: process.cwd(),
    stdio: "inherit",
  });
  if (task.stdout) {
    task.stdout.pipe(process.stdout);
  }

  if (task.stderr) {
    task.stderr.pipe(process.stdout);
  }
  task.on("close", (code) => {
    if (code) {
      console.log(e.code);
      const e = new Error("command execute failed");
      e.code = code;
      throw new Error(e);
      // return Promise.reject(e);
    }
    return Promise.resolve(code);
  });

  return Promise.resolve();
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
