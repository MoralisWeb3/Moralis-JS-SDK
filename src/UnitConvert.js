import Web3 from 'web3';

/* global window */
const MWeb3 = typeof Web3 === 'function' ? Web3 : window.Web3;

class UnitConverter {
  static ETH(value) {
    return MWeb3.utils.toWei(`${value}`, 'ether');
  }

  static Token(value, decimals) {
    return MWeb3.utils.toBN('0x' + (+value * 10 ** decimals).toString(16));
  }

  static FromWei(value, decimals) {
    return value / Math.pow(10, +decimals ?? 18);
  }
}

module.exports = UnitConverter;
