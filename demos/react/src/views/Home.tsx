import { VStack, Heading, Button, Textarea, List, ListItem } from '@chakra-ui/react';
import {
  useEvmBlock,
  useEvmNFTContractMetadata,
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

  const { fetch: getNFTMetadata } = useEvmNFTContractMetadata({
    address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  });
  const { fetch: getBlock } = useEvmBlock({ chain: '0x13881', blockNumberOrHash: '10000' });

  const { fetch: runContractFunction } = useEvmRunContractFunction({
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    functionName: 'ownerOf',
    chain: '0x1',
    params: {
      _tokenId: '6651',
    },
    abi: ABI,
  });

  const { fetch: resolveDomain } = useEvmResolveDomain({
    domain: 'brad.crypto',
  });
  const { fetch: getWeb3ApiVersion } = useEvmWeb3ApiVersion();

  async function awaitAndPrint(operation: () => Promise<unknown>) {
    const res = await operation();
    setOutput(JSON.stringify(res));
  }

  return (
    <VStack alignItems={'start'}>
      <Heading mb={8}>Home</Heading>
      <Textarea value={output} />

      <List>
        <ListItem mb={2}>
          <Button onClick={() => awaitAndPrint(getNFTMetadata)}>getNFTMetadata</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={() => awaitAndPrint(getBlock)}>getBlock</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={() => awaitAndPrint(runContractFunction)}>runContractFunction</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={() => awaitAndPrint(resolveDomain)}>resolveDomain</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={() => awaitAndPrint(getWeb3ApiVersion)}>web3ApiVersion</Button>
        </ListItem>
      </List>
    </VStack>
  );
};

export default Home;
