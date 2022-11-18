export const createTokenPriceResponse = (exchangeAddress: string) => {
  return {
    nativePrice: { value: '8244913831', decimals: 18, name: 'Ether', symbol: 'ETH' },
    usdPrice: 0.000011961341215674,
    exchangeAddress,
    exchangeName: 'Uniswap v3',
  };
};
