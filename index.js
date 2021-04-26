const core = require('@actions/core');
const github = require('@actions/github');
// const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');

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
  console.log('---directoryPath ---');
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
  console.log('---directoryPath end---');
  fs.readdir(process.cwd(), function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    console.log('---process start---');
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      console.log(file);
    });
    console.log('---process end end---');
  });
  console.log('---process end end---');
  const time = new Date().toTimeString();
  core.setOutput('time', time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(
    github.context.payload.pull_request.body,
    undefined,
    2
  );
  console.log(`The event payload is: ${payload}`);
  // await exec.exec('node', ['changelog.js', 'foo=bar']);
  // fs.readFile('./CHANGELOG.md', (err, data) => {
  //   // if there's an error, log it and return
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }

  //   const newData = data.toString + payload;

  //   fs.writeFile('./CHANGELOG.md', newData, (err) => {
  //     // If there is any error in writing to the file, return
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }

  //     // Log this message if the file was written to successfully
  //     console.log('wrote to file successfully');
  //   });
  // });
} catch (error) {
  core.setFailed(error.message);
}
