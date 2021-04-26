const core = require('@actions/core');
const github = require('@actions/github');
// const exec = require('@actions/exec');
// const fs = require('fs');
// const path = require('path');

try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // console.log('process.cwd()');
  // console.log(process.cwd());

  // fs.readdir(directoryPath, function (err, files) {
  //   //handling error
  //   if (err) {
  //     return console.log('Unable to scan directory: ' + err);
  //   }
  //   //listing all files using forEach
  //   console.log('---directoryPath ---');
  //   files.forEach(function (file) {
  //     // Do whatever you want to do with the file
  //     console.log(file);
  //   });
  //   console.log('---directoryPath ---');
  // });
  console.log(github.context.payload.pull_request.body);
  // const payload = JSON.stringify(
  //   github.context.payload.pull_request.body,
  //   undefined,
  //   2
  // );
  // console.log(`The event payload is: ${payload}`);

  // const changelogPath = path.join(__dirname, 'CHANGELOG.md');
  // console.log('---changelogPath ---');
  // console.log(changelogPath);
  // const data = fs.readFileSync(changelogPath, 'utf8');
  // const newData = data + payload;

  // console.log(`New Changelog is : ${newData}`);

  // fs.writeFileSync(changelogPath, newData);
  // // Log this message if the file was written to successfully
  // console.log('wrote to file successfully');
  const finalData = github.context.payload.pull_request.body.replace(/"/g, "'");
  // const time = new Date().toTimeString();
  core.setOutput('changelog', finalData);
  // Get the JSON webhook payload for the event that triggered the workflow

  // await exec.exec('node', ['changelog.js', 'foo=bar']);
} catch (error) {
  core.setFailed(error.message);
}
