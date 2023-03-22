export interface Config {
  apiKey: string;
}

export function getConfig(): Config {
  const apiKey = process.env.MORALIS_API_KEY as string | undefined;
  if (!apiKey) {
    throw new Error('MORALIS_API_KEY is not defined');
  }
  return { apiKey };
}
