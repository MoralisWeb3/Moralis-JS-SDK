import { ethers } from 'ethers';

class UnitConverter {
  static ETH(value) {
    return ethers.utils.parseEther(`${value}`).toString();
  }

  static Token(value, decimals = 18) {
    return ethers.utils.parseUnits(`${value}`, +decimals).toString();
  }

  static FromWei(value, decimals = 18) {
    return ethers.utils.formatUnits(value, decimals);
  }
}

module.exports = UnitConverter;
