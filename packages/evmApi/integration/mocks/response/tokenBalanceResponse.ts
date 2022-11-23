export const createTokenBalanceResponse = (
  tokenAddress: string,
  name: string,
  symbol: string,
  logo: string,
  thumbnail: string,
  decimals: number,
  balance: string,
) => ({
  token_address: tokenAddress,
  name,
  symbol,
  logo,
  thumbnail,
  decimals,
  balance,
});
