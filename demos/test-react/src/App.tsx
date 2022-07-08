import { useEVM } from '@moralisweb3/react';

const App = () => {
  const { connect, isConnecting } = useEVM();
  console.log('isConnecting: ', isConnecting);
  return (
    <div>
      <h1>Demo React App</h1>
      <button onClick={() => connect()}>Connect</button>
    </div>
  );
};

export default App;
