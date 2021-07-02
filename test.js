const inquirer = require("inquirer");
/* eslint-disable @typescript-eslint/no-var-requires */
const Git = require("git-rev-sync");
const execa = require("execa");
const { spawn } = require("child_process");
console.log(Git.branch());
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
      return Promise.reject(e);
    }
    return Promise.resolve();
  });
  return Promise.resolve();
}

async function gitRun() {
  const { msg } = await inquirer.prompt([
    {
      type: "input",
      name: "msg",
      message: "commit msg",
      default: "update files",
    },
  ]);
  gitAdd(["add", "."])
    .then(() => {
      gitAdd(["commit", "-m", msg]);
    })
    .then(() => {
      gitAdd(["push", "origin", Git.branch()]);
    });
}

gitRun();
