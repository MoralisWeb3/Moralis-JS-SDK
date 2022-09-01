const { exec } = require('child_process');

const execCommand = function (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
        return reject(error);
      }
      const output = stdout ? stdout : stderr;
      console.log(output);
      resolve(output);
    });
  });
};

execCommand(`yarn plop`);
