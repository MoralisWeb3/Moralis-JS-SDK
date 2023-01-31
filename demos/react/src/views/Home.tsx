import { VStack, Heading, Button, Textarea, List, ListItem } from '@chakra-ui/react';
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

  const { data: vitalikBalance, isFetching } = useEvmNativeBalance(
    {
      address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    },
    { revalidateOnFocus: true },
  );

  const { fetch: getNFTMetadata } = useEvmNFTContractMetadata(undefined, {
    revalidateOnMount: false,
    onSuccess: (res) => setOutput(JSON.stringify(res)),
  });
  const { fetch: getBlock } = useEvmBlock(
    { chain: '0x13881', blockNumberOrHash: '10000' },
    { revalidateOnMount: false, onSuccess: (res) => setOutput(JSON.stringify(res)) },
  );

  const { fetch: runContractFunction } = useEvmRunContractFunction(
    {
      address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
      functionName: 'ownerOf',
      chain: '0x1',
      params: {
        _tokenId: '6651',
      },
      abi: ABI,
    },
    { revalidateOnMount: false, onSuccess: (res) => setOutput(res) },
  );

  const { fetch: resolveDomain } = useEvmResolveDomain(
    {
      domain: 'brad.crypto',
    },
    { revalidateOnMount: false, onSuccess: (res) => setOutput(JSON.stringify(res)) },
  );
  const { fetch: getWeb3ApiVersion } = useEvmWeb3ApiVersion({
    revalidateOnMount: false,
    onSuccess: (res) => setOutput(JSON.stringify(res)),
  });

  return (
    <VStack alignItems={'start'}>
      <Heading mb={8}>Home</Heading>
      <Heading fontSize="lg">
        Vitalik's ETH Balance: {isFetching ? 'Fetching...' : vitalikBalance?.balance.ether} ETH
      </Heading>
      <Heading fontSize="lg">Fetched manually data:</Heading>
      <Textarea value={output} />

      <List>
        <ListItem mb={2}>
          <Button onClick={() => getNFTMetadata({
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    })}>getNFTMetadata</Button>
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
