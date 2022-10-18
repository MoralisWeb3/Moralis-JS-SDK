import { VStack, Heading, FormControl, FormLabel, Input, Button, Box, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NftGrid } from '../components/NftGrid';
import { useMoralis } from 'react-moralis';

export const Nfts = () => {
  const { account } = useMoralis();
  const [address, setAddress] = useState<string>(account || '');
  const [chain, setChain] = useState<string>('0x1');
  const [searchChain, setSearchChain] = useState<string>('0x1');
  const [searchAddress, setSearchAddress] = useState<string>(account || '');

  useEffect(() => {
    if (!address && account) {
      setAddress(account);
    }
  }, [account, address]);

  return (
    <VStack alignItems={'start'}>
      <Heading mb={4}>List EVM NFTs</Heading>

      <Box width="full">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSearchAddress(address);
            setSearchChain(chain);
          }}
        >
          <VStack>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input required value={address} onChange={(event) => setAddress(event.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Chain</FormLabel>
              <Select required value={chain} onChange={(event) => setChain(event.target.value)}>
                <option value="0x1">Ethereum</option>
                <option value="0x89">Polygon</option>
              </Select>
            </FormControl>
            <Button type="submit" width="full" colorScheme="blue">
              Show NFTs
            </Button>
          </VStack>
        </form>
      </Box>

      {searchAddress && (
        <Box pt={8}>
          <Heading size={'md'} mb={4}>
            NFTs for {searchAddress}
          </Heading>
          <NftGrid address={searchAddress} chain={searchChain} />
        </Box>
      )}
    </VStack>
  );
};
