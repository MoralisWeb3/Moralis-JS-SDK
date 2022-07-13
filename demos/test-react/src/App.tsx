import { useEvmContract, useMoralisCore, useMoralisEvm, useEvmSignMessage, useEvmChain } from '@moralisweb3/react';
import { Erc20__factory } from '@moralisweb3/evm';
import Header from './Header';

const App = () => {
  const { connect, chain } = useMoralisEvm();
  const { isStarting, isStarted } = useMoralisCore();
  const { switchChain, addChainToWallet } = useEvmChain();
  const { data, execute, error } = useEvmContract({
    abi: Erc20__factory.abi,
    address: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
  });
  const { sign } = useEvmSignMessage();
  console.log('isStarting: ', isStarting);
  console.log('contractData: ', data);
  console.log('isStarted: ', isStarted);
  console.log('errorHook: ', error);
  return (
    <div>
      <h1>Demo React App</h1>
      <Header />
      <button
        onClick={() =>
          connect('metamask', {
            onComplete() {
              alert('yess');
            },
          })
        }
      >
        Connect
      </button>
      <button
        onClick={async () => {
          const data = await execute({ functionName: 'name' });
          console.log('dataFromCallBack: ', data);
        }}
      >
        execute Link Contract
      </button>
      <button
        onClick={async () => {
          const data = await sign('My Message');
          console.log('dataFromCallBack: ', data);
        }}
      >
        Sign Message
      </button>
      <button onClick={() => switchChain('0x61')}>Switch to 0x61 Chain</button>
      <button onClick={() => addChainToWallet('0x61')}>Add 0x61 Chain To Wallet(</button>
      <div>Chain: {chain?.name}</div>
    </div>
  );
};

export default App;
