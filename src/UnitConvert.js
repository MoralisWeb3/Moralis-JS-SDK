import { ethers } from 'ethers';

class UnitConverter {
  static ETH(value) {
    return ethers.utils.parseEther(`${value}`).toString();
  }

  static Token(value, decimals = 18) {
    return ethers.utils.parseUnits(`${value}`, +decimals).toString();
  }

  static FromWei(value, decimals = 18) {
    const result = ethers.utils.formatUnits(value, decimals);
    // formatUnits will always add a trailing 0, remove this as we want to return "1" instead of "1.0"
    const splitResult = result.split('.');
    if (splitResult[1] === '0') {
      return splitResult[0];
    }
    return result;
  }
}

module.exports = UnitConverter;
