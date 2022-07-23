import { providers } from 'ethers';
import useApiPost from '../../hooks/useApiPost';

const LoginButton = () => {
  const apiPost = useApiPost();

  const connectToMetamask = async () => {
    const provider = new providers.Web3Provider((window as any).ethereum, 'any');

    const [accounts, chainId] = await Promise.all([
      provider.send('eth_requestAccounts', []),
      provider.send('eth_chainId', []),
    ]);

    const signer = provider.getSigner();
    return { signer, chain: chainId, account: accounts[0] };
  };

  const handleAuth = async () => {
    const { account, chain, signer } = await connectToMetamask();

    const userData = { address: account, chain, network: 'evm' };

    const { message } = await apiPost('/auth/request-message', userData);

    const signature = await signer.signMessage(message);

    await apiPost('/auth/verify-message', { message, signature, network: 'evm' });
  };

  return (
    <button className="connectButton" onClick={handleAuth}>
      Authenticate via Metamask
      <style jsx>{`
        .connectButton {
          cursor: pointer;
          color: white;
          font-weight: 550;
          font-size: 20px;
          border: none;
          padding: 12px 20px;
          background: #00d1ae;
          box-shadow: inset 0px 0px 2px #32fecb;
          border-radius: 16px;
        }

        .connectButton:hover {
          background-color: #00ad96;
        }
      `}</style>
    </button>
  );
};

export default LoginButton;
