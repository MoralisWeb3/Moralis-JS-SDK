import { useMoralisCore, useMoralisEvm } from '@moralisweb3/react';
import Header from './Header';
const App = () => {
  const { connect, chain, Evm } = useMoralisEvm();
  const { Core, isStarting, isStarted } = useMoralisCore();
  console.log('isStarting: ', isStarting);
  console.log('isStarted: ', isStarted);
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
      <div>Chain: {chain?.name}</div>
    </div>
  );
};

export default App;
