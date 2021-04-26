const fs = require('fs');
const path = require('path');

const changelogPath = path.join(__dirname, 'CHANGELOG.md');
console.log('---changelogPath ---');
console.log(changelogPath);
fs.readFile(changelogPath, 'utf8', (err, data) => {
  // if there's an error, log it and return
  if (err) {
    console.error(err);
    return;
  }

  const newData =
    data +
    'FR-14330 New icon sandbox page\r\nFR-13953 Feature toggle info card terminal rights\r\nFR-14207 Unable to update active field for CapabilityDefinitions\r\nFR-10404 confirm dialog and information dialog design changes batch 1\r\nFR-13815 Update dropzones\r\nFR-12691 Allow multiple refunds for VAT';

  console.log(newData);

  //   console.log(`New Changelog is : ${newData}`);

  fs.writeFile(changelogPath, newData, (err) => {
    // If there is any error in writing to the file, return
    if (err) {
      console.error(err);
      return;
    }

    // Log this message if the file was written to successfully
    console.log('wrote to file successfully');
  });
});
