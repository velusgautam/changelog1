const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput('time', time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(
    github.context.payload.pull_request.body,
    undefined,
    2
  );
  console.log(`The event payload is: ${payload}`);
  fs.readFile('CHANGELOG.md', (err, data) => {
    // if there's an error, log it and return
    if (err) {
      console.error(err);
      return;
    }

    const newData = data.toString + payload;

    fs.writeFile('CHANGELOG.md', newData, (err) => {
      // If there is any error in writing to the file, return
      if (err) {
        console.error(err);
        return;
      }

      // Log this message if the file was written to successfully
      console.log('wrote to file successfully');
    });
  });
} catch (error) {
  core.setFailed(error.message);
}
