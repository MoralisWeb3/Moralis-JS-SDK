import Web3 from 'web3';
import BigNumber from 'bignumber.js';

/* global window */
const MWeb3 = typeof Web3 === 'function' ? Web3 : window.Web3;

class UnitConverter {
  static ETH(value) {
    return MWeb3.utils.toWei(`${value}`, 'ether');
  }

  static Token(value, decimals) {
    return BigNumber(+value).times(`1e+${decimals}`);
  }

  static FromWei(value, decimals) {
    return BigNumber(+value)
      .div(`1e+${decimals ?? 18}`)
      .toNumber();
  }
}

module.exports = UnitConverter;
