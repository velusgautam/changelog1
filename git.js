require('dotenv').config();

const simpleGitPromise = require('simple-git/promise')();
const { ENGINE_USER, ENGINE_PASS, ENGINE_PATH, ENGINE_REPO } = process.env;

const remote = `https://${ENGINE_USER}:${ENGINE_PASS}@${ENGINE_REPO}`;

function runGit() {
  simpleGitPromise.addConfig('user.email', 'i@velusgautam.com');
  simpleGitPromise.addConfig('user.name', 'VS Gautam');

  // Add remore repo url as origin to repo
  simpleGitPromise.checkIsRepo((err, status) => {
    if (!status) {
      simpleGitPromise.addRemote('origin', ENGINE_PATH);
    }
  });

  simpleGitPromise.pull(remote, 'master').then(
    (success) => {
      console.log('Successfully pulled');
    },
    (failed) => {
      console.log('repo pull failed');
    }
  );

  simpleGitPromise.status().then((status) => {
    if (status && status.files.length > 0) {
      updateGit();
    }
  });
}

function updateGit() {
  // Add all files for commit
  simpleGitPromise.add('.').then(
    (addSuccess, status) => {
      console.log('====================================');
      console.log('Successfully added files');
    },
    (failedAdd) => {
      console.log('adding files failed');
    }
  );
  // Commit files as Initial Commit

  var today = new Date();
  var date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time;
  simpleGitPromise.commit(`Auto Commit from Engine on  ${dateTime}`).then(
    (successCommit, status) => {
      console.log('successCommit', successCommit);
    },
    (failed) => {
      console.log('failed commmit');
    }
  );

  simpleGitPromise.push(remote, 'master').then(
    (success) => {
      console.log('Successfully pushed');
    },
    (failed) => {
      console.log('repo push failed');
    }
  );
}

module.exports = runGit;
