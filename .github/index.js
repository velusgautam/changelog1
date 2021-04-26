const core = require('@actions/core');
const github = require('@actions/github');

try {
  const isPROpened = github.context.payload.action === 'opened';

  let finalData = '';
  if (isPROpened === true) {
    const title = github.context.payload.pull_request.title;
    const changeDescription = github.context.payload.pull_request.body.replace(
      /"/g,
      "'"
    );
    finalData = `
## ${title}

##Changes

${changeDescription}
    `;
  }

  core.setOutput('changelog', finalData);
} catch (error) {
  core.setFailed(error.message);
}
