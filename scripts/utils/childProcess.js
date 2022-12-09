const execSync = require('child_process').execSync;

const tryChildProcess = (command) => {
  console.log(`executing: ${command}`);
  try {
    const res = execSync(command);

    console.log('Success', res.toString());
  } catch (error) {
    console.error('Failed output', error);
    console.error('Failed sdterr', error.stderr.toString());
    console.error('Failed stdout', error.stdout.toString());
  }
};

module.exports = {
  tryChildProcess,
};
