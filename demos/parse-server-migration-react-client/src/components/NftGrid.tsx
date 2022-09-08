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
import React from 'react';
import { useNFTBalances } from 'react-moralis';

interface NftProps {
  name: string;
  metadata?: { image?: string };
  address: string;
  id: string;
  type: string;
}
const Nft = ({ name, address, id, metadata, type }: NftProps) => {
  return (
    <Box backgroundColor="gray.100" borderRadius="8px" overflow="hidden">
      {metadata?.image && <Image src={metadata?.image.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/')} />}
      <Box p={4}>
        <Heading fontSize={'md'}>
          {name} #{id}
        </Heading>

        <Wrap my={2}>
          <Tag colorScheme={'blue'}>Type {type}</Tag>
          <Tag colorScheme={'blue'}>Id #{id}</Tag>
        </Wrap>

        <Text fontSize={'sm'}>Address: {address}</Text>
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
  const { data, error, isLoading } = useNFTBalances(
    {
      //@ts-ignore
      chain,
      address,
    },
    {
      autoFetch: true,
    },
  );

  if (isLoading) {
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

  if (!data?.result || data.result.length === 0) {
    return <Box>No results</Box>;
  }

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
      {data.result.map((nft) => (
        <GridItem key={`${nft.token_address}${nft.token_id}`}>
          <Nft
            name={nft.name}
            id={nft.token_id}
            address={nft.token_address}
            metadata={nft.metadata}
            type={nft.contract_type}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
