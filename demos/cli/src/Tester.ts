/* eslint-disable no-console */

let successCount = 0;
let errorCount = 0;

function trim(message: string, n: number): string {
  return message.length > n ? `${message.substring(0, n)}...` : message;
}

export async function smokeTest(groupName: string, name: string, getValue: () => Promise<unknown>) {
  try {
    const value = await getValue();
    console.log(`✅ (${groupName}) ${name} = ${trim(JSON.stringify(value), 32)}`);
    successCount++;
  } catch (e) {
    console.log(e);
    console.error(`❌ ${name} = ${e}`);
    errorCount++;
  }
}

export function getTestStats() {
  return {
    successCount,
    errorCount,
  };
}
