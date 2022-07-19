/* eslint-disable no-console */

let successCount = 0;
let errorCount = 0;

export async function smoketest(key: string, getValue: () => Promise<unknown>) {
  try {
    const value = await getValue();
    console.log(`✅ ${key} = ${JSON.stringify(value)}`);
    successCount++;
  } catch (e) {
    console.error(`❌ ${key} = ${e}`);
    // console.error(e);
    errorCount++;
  }
}

export function getSmoketestStats() {
  return {
    successCount,
    errorCount
  };
}
