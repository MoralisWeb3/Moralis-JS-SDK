import {
  Text,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
  Grid,
  GridItem,
  Heading,
  Image,
  Wrap,
  Tag,
} from '@chakra-ui/react';
import { EvmNft } from 'moralis/common-evm-utils';
import { useEvmWalletNFTs } from '@moralisweb3/react';

const Nft = ({
  name,
  tokenAddress,
  tokenId,
  metadata,
  contractType,
}: Pick<EvmNft, 'name' | 'tokenId' | 'tokenAddress' | 'metadata' | 'contractType'>) => {
  return (
    <Box backgroundColor="gray.100" borderRadius="8px" overflow="hidden">
      {(metadata as { image: string })?.image && (
        <Image src={(metadata as { image: string })?.image.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/')} />
      )}
      <Box p={4}>
        <Heading fontSize={'md'}>
          {name} #{tokenId}
        </Heading>

        <Wrap my={2}>
          <Tag colorScheme={'blue'}>Type {contractType}</Tag>
          <Tag colorScheme={'blue'}>Id #{tokenId}</Tag>
        </Wrap>

        <Text fontSize={'sm'}>Address: {tokenAddress.checksum}</Text>
        <pre style={{ fontSize: '0.8rem', overflowX: 'scroll', lineHeight: 1.25 }}>
          {JSON.stringify(metadata, null, 2)}
        </pre>
      </Box>
    </Box>
  );
};
interface NftGridProps {
  address: string;
  chain: string;
}

export const NftGrid = ({ address, chain }: NftGridProps) => {
  const { data, error, isFetching } = useEvmWalletNFTs({ address, chain });

  if (isFetching) {
    return (
      <Box>
        <Spinner thickness="4px" color="blue.300" size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error.name}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return <Box>No results</Box>;
  }

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
      {data.map((nft, key) => (
        <GridItem key={key}>
          <Nft
            name={nft.name}
            tokenId={nft.tokenId}
            tokenAddress={nft.tokenAddress}
            metadata={nft.metadata}
            contractType={nft.contractType}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
