const core = require('@actions/core');
const github = require('@actions/github');
// const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');

const gitPath = path.join(__dirname, 'git.js');
const runGit = require(gitPath);

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  console.log('process.cwd()');
  console.log(process.cwd());
  console.log('---end---');
  console.log(__dirname);
  console.log('---end---');
  const directoryPath = __dirname;

  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    console.log('---directoryPath ---');
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      console.log(file);
    });
    console.log('---directoryPath ---');
  });

  const payload = JSON.stringify(
    github.context.payload.pull_request.body,
    undefined,
    2
  );
  console.log(`The event payload is: ${payload}`);

  const changelogPath = path.join(__dirname, 'CHANGELOG.md');
  console.log('---changelogPath ---');
  console.log(changelogPath);
  fs.readFile(changelogPath, 'utf8', (err, data) => {
    // if there's an error, log it and return
    if (err) {
      console.error(err);
      return;
    }

    const newData = data + payload;

    console.log(`New Changelog is : ${newData}`);

    fs.writeFile(changelogPath, newData, (err) => {
      // If there is any error in writing to the file, return
      if (err) {
        console.error(err);
        return;
      }

      // Log this message if the file was written to successfully
      console.log('wrote to file successfully');
      runGit();
    });
  });

  const time = new Date().toTimeString();
  core.setOutput('time', time);
  // Get the JSON webhook payload for the event that triggered the workflow

  // await exec.exec('node', ['changelog.js', 'foo=bar']);
} catch (error) {
  core.setFailed(error.message);
}
