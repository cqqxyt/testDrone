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
      await spawn([".git/index.lock"], "rm");
    }
    await gitExcute(msg);
  }
}
async function gitExcute(msg) {
  await excute(["add", "."]);
  console.log("commit");
  await excute(["commit", "-m", msg]);
  await excute(["push", "--set-upstream", "origin", Git.branch()]);
}

async function excute(params, command = "git") {
  const task = spawn(command, params, {
    cwd: process.cwd(),
    stdio: "inherit",
  });
  console.log(task);
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
    console.log("close");
    if (code) {
      const e = new Error("command execute failed");
      e.code = code;
      throw new Error(e);
    }
  });
  task.on("exit", (e) => {
    console.log(params);
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
