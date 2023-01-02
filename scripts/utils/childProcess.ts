const execSync = require('child_process').execSync;

export const runChildProcess = (command: string) => {
  console.log(`📺 executing: ${command}`);
  try {
    const res = execSync(command);

    console.log('✅ Success', res.toString());
  } catch (error: any) {
    console.error('❌ Failed sdterr', error.stderr.toString());
    throw error;
  }
};
