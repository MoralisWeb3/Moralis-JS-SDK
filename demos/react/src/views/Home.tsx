import { Button, Heading, List, ListItem, Textarea, VStack } from '@chakra-ui/react';
import {
  useEvmBlock,
  useEvmNFTContractMetadata,
  useEvmNativeBalance,
  useEvmResolveDomain,
  useEvmRunContractFunction,
  useEvmWeb3ApiVersion,
} from '@moralisweb3/react';
import { useState } from 'react';

const ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const Home = () => {
  const [output, setOutput] = useState<string>();

  const { data: vitalikBalance } = useEvmNativeBalance({
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  });

  const { refetch: getNFTMetadata } = useEvmNFTContractMetadata({
    address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    enabled: false,
    onSuccess: (res) => setOutput(JSON.stringify(res)),
  });
  const { refetch: getBlock } = useEvmBlock({
    chain: '0x13881',
    blockNumberOrHash: '10000',
    enabled: false,
    onSuccess: (res) => setOutput(JSON.stringify(res)),
  });

  const { refetch: runContractFunction } = useEvmRunContractFunction({
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    functionName: 'ownerOf',
    chain: '0x1',
    params: {
      _tokenId: '6651',
    },
    abi: ABI,
    enabled: false,
    onSuccess: (res) => setOutput(res),
  });

  const { refetch: resolveDomain } = useEvmResolveDomain({
    domain: 'brad.crypto',
    enabled: false,
    onSuccess: (res) => setOutput(JSON.stringify(res)),
  });
  const { refetch: getWeb3ApiVersion } = useEvmWeb3ApiVersion({
    enabled: false,
    onSuccess: (res) => setOutput(JSON.stringify(res)),
  });

  return (
    <VStack alignItems={'start'}>
      <Heading mb={8}>Home</Heading>
      <Heading fontSize="lg">
        Vitalik's ETH Balance: {vitalikBalance ? vitalikBalance?.balance.ether : 'Fetching...'} ETH
      </Heading>
      <Heading fontSize="lg">Fetched manually data:</Heading>
      <Textarea value={output} />

      <List>
        <ListItem mb={2}>
          <Button onClick={() => getNFTMetadata()}>getNFTMetadata</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={() => getBlock()}>getBlock</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={() => runContractFunction()}>runContractFunction</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={() => resolveDomain()}>resolveDomain</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={() => getWeb3ApiVersion()}>web3ApiVersion</Button>
        </ListItem>
      </List>
    </VStack>
  );
};

export default Home;
