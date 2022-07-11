import { useEVM } from '@moralisweb3/react';
const App = () => {
  const { connect, isConnecting, web3 } = useEVM();
  console.log('web3: ', web3);
  return (
    <div>
      <h1>Demo React App</h1>
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
    </div>
  );
};

export default App;
