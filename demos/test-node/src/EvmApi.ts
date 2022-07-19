import Moralis from "moralis";
import { smoketest } from "./Smoketest";

export async function testEvm() {
  await smoketest('(Evm) Api version', () => {
    return Moralis.EvmApi.info.web3ApiVersion();
  });

  await smoketest('(Evm) Resolve address', () => {
    return Moralis.EvmApi.resolve.resolveAddress({
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    });
  });
}
