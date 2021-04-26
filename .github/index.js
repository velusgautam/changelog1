const core = require('@actions/core');
const github = require('@actions/github');

try {
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  const isPROpened = github.context.payload.action === 'opened';

  let releaseLog = '';
  if (isPROpened === true) {
    const title = github.context.payload.pull_request.title;
    const changeDescription = github.context.payload.pull_request.body.replace(
      /"/g,
      "'"
    );
    releaseLog = `
## ${title}

${changeDescription}
    `;
  }

  core.setOutput('changelog', releaseLog);
} catch (error) {
  core.setFailed(error.message);
}
