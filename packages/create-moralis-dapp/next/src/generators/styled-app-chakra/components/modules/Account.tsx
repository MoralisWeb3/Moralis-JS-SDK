import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Button } from 'components/elements';

export default function Account() {
    const { account, activate, deactivate } = useWeb3React();

    const onConnect = () => {
        activate(new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] }));
    };

    const onDeactivate = () => {
        deactivate();
    };

    function sliceEthAddress(address: string) {
        const regex = /^(.{4}).+(.{4})$/;
        return address.replace(regex, '$1...$2');
    }

    if (!account) {
        return <Button onClick={onConnect}>Connect Wallet</Button>;
    }

    return <Button onClick={onDeactivate}>{sliceEthAddress(account)}</Button>;
}
