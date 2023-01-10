import { VStack, Heading, Button, Textarea, List, ListItem } from '@chakra-ui/react';
import { useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';

const Home = () => {
  const api = useMoralisWeb3Api();
  const [output, setOutput] = useState<string>();

  function print(value: unknown) {
    setOutput(JSON.stringify(value));
  }

  async function getNFTMetadata() {
    const metadata = await api.token.getNFTMetadata({
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    });
    print(metadata);
  }

  async function getBlock() {
    const block = await api.native.getBlock({
      chain: '0x13881',
      block_number_or_hash: '10000',
    });
    print(block);
  }

  async function runContractFunction() {
    const ABI = [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];
    const options = {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      function_name: 'name',
      chain: '0x1',
      abi: ABI,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await api.native.runContractFunction(options as any);
    print(result);
  }

  async function resolveDomain() {
    const result = await api.resolve.resolveDomain({
      domain: 'brad.crypto',
    });
    print(result);
  }

  async function web3ApiVersion() {
    const result = await api.info.web3ApiVersion();
    print(result);
  }

  return (
    <VStack alignItems={'start'}>
      <Heading mb={8}>Home</Heading>
      <Textarea value={output} />

      <List>
        <ListItem mb={2}>
          <Button onClick={getNFTMetadata}>getNFTMetadata</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={getBlock}>getBlock</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={runContractFunction}>runContractFunction</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={resolveDomain}>resolveDomain</Button>
        </ListItem>
        <ListItem mb={2}>
          <Button onClick={web3ApiVersion}>web3ApiVersion</Button>
        </ListItem>
      </List>
    </VStack>
  );
};

export default Home;
