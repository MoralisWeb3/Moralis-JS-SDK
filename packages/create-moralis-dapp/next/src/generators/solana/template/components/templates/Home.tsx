import { AddressInput, DataOutput, SectionHeading } from 'components/elements';
import { Default } from 'components/layouts';
import { useSolPortfolio } from '@moralisweb3/react';
import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';

export default function Home() {
    const [solanaAddress, setSolanaAddress] = React.useState('BWeBmN8zYDXgx2tnGj72cA533GZEWAVeqR9Eu29txaen');
    const {
        data: solanaBalance,
        refetch: fetchPortfolio,
        error: errorPortfolio,
    } = useSolPortfolio({ address: solanaAddress }, { enabled: false });
    const { publicKey } = useWallet();

    React.useEffect(() => {
        if (!publicKey) {
            return;
        }
        setSolanaAddress(publicKey?.toString());
    }, [publicKey]);

    return (
        <Default>
            <SectionHeading>Get Solana Portfolio</SectionHeading>
            <AddressInput address={solanaAddress} setAddress={setSolanaAddress} fetch={fetchPortfolio} />
            <SectionHeading>Result:</SectionHeading>
            {errorPortfolio ? (
                <DataOutput>{JSON.stringify(errorPortfolio)}</DataOutput>
            ) : (
                <DataOutput>{solanaBalance ? JSON.stringify(solanaBalance, null, 2) : 'Click the "🔎" button to fetch data'}</DataOutput>
            )}
        </Default>
    );
}