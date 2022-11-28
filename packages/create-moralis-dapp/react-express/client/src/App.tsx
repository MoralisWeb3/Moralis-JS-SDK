import logo from './logo.svg';
import './App.css';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import axios from 'axios';

const EVM_PROXY_URL = 'http://localhost:1337/api';

const handlePost = async (endpoint: string, params?: any) => {
  const result = await axios.post(`${EVM_PROXY_URL}/${endpoint}`, params);

  return result.data;
};

function App() {
  const { connectAsync } = useConnect({ connector: new MetaMaskConnector() });
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }
    const { account, chain } = await connectAsync();

    const userData = { address: account, chain: chain.id.toString() };

    const { message }: Record<string, string> = await handlePost('evm-auth/request-message', userData);

    const signature = await signMessageAsync({ message });

    const user = await handlePost('evm-auth/verify-message', { signature, message });

    console.log('xxx: ', user);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleAuth}>Authenticate</button>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
