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
      const ls = spawn(["rm", ".git/index.lock"]);
      console.log(ls);
      await ls;
    }
    await gitExcute(msg);
  }
}
async function gitExcute(msg) {
  await gitAdd(["add", "."]);
  await gitAdd(["commit", "-m", msg]);
  // await gitAdd(["push", "--set-upstream", "origin", Git.branch()]);
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
      const e = new Error("command execute failed");
      e.code = code;
      throw new Error(e);
    }
  });
  task.on("exit", (e) => {
    console.log("成功");
    process.exit(e);
    return Promise.resolve(e);
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
