import { useEvmContract, useMoralisCore, useMoralisEvm, useEvmSignMessage, useEvmChain } from '@moralisweb3/react';
import { Erc20__factory } from '@moralisweb3/evm/src/Contract/generated/factories';
import Header from './Header';

const App = () => {
  const { connect, chain } = useMoralisEvm();
  const { isStarting, isStarted } = useMoralisCore();
  const { switchChain } = useEvmChain();
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
          const data = sign('My Message');
          console.log('dataFromCallBack: ', data);
        }}
      >
        Sign Message
      </button>
      <button
        onClick={async () => {
          const data = await switchChain('0x1');
          console.log('dataFromSwitch: ', data);
        }}
      >
        Switch Chain
      </button>
      <div>Chain: {chain?.name}</div>
    </div>
  );
};

export default App;
