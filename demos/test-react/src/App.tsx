import {
  useEvmContract,
  useEvmChain,
  useEvmSignMessage,
  useEvmAccount,
  useMoralisEvm,
  useEvmNative,
} from '@moralisweb3/react';
import { Erc20__factory } from '@moralisweb3/evm';

const App = () => {
  const {
    receipt,
    transfer,
    transaction,
    error: txError,
  } = useEvmNative({
    to: '0x3D7258055be449b11AfFF0A5eAddbd6e278C1916',
    value: '0.1',
  });
  const { chain } = useEvmChain();
  const { account, connect } = useEvmAccount();
  const { isConnected } = useMoralisEvm();
  const { sign } = useEvmSignMessage();
  // const { isStarting, isStarted } = useMoralisCore();
  const { switchChain, addChainToWallet } = useEvmChain();
  const { data, execute, error } = useEvmContract({
    abi: Erc20__factory.abi,
    contractAddress: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
  });

  console.log('receipt: ', receipt);
  console.log('transaction: ', transaction);
  console.log('txError: ', txError);
  return (
    <div>
      <h1>Demo React App</h1>
      <div>Account: {account?.checksum}</div>
      <div>Chain: {chain?.name}</div>
      <div>isConnected: {isConnected ? 'yes' : 'no'}</div>
      <button onClick={() => connect('metamask')}>Connect</button>
      <button
        onClick={async () => {
          // const data = await execute({ functionName: 'name' });
          const data = await execute({ functionName: 'name' });
          console.log('dataFromCallBack: ', data);
        }}
      >
        execute Link Contract
      </button>
      <button onClick={() => sign('message', {})}>Sign Message</button>
      <button onClick={() => switchChain('0x61', { onSuccess: () => console.log('kek') })}>Switch to 0x61 Chain</button>
      <button onClick={() => addChainToWallet('0x61')}>Add 0x61 Chain To Wallet(</button>
      <button onClick={() => transfer({ onError: (err) => console.log('errFck: ', err) })}>Transfer Native</button>
    </div>
  );
};

export default App;
