import { toBuffer, bufferToHex, keccak256 } from 'ethereumjs-util';

const SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

const isHexStrict = (hex: string) => {
  return /^(-)?0x[0-9a-f]*$/i.test(hex);
};

export const sha3 = function (value: string) {
  let bufferValue: Buffer;
  if (isHexStrict(value) && /^0x/i.test(value.toString())) {
    bufferValue = toBuffer(value);
  } else {
    // Assume value is an arbitrary string
    bufferValue = Buffer.from(value, 'utf-8');
  }

  const returnValue = bufferToHex(keccak256(bufferValue));

  if (returnValue === SHA3_NULL_S) {
    return null;
  }
  return returnValue;
};
