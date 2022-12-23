import React from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import { useMoralisCloudFunction } from 'react-moralis';

const Home = () => {
  const { data } = useMoralisCloudFunction('moralis', {
    moduleName: 'evmApi',
    operationName: 'getNativeBalance',
    request: {
      chain: '0x1',
      address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    },
  });
  // eslint-disable-next-line no-console
  console.log('data: ', data);
  // useEffect(())
  return (
    <VStack alignItems={'start'}>
      <Heading mb={8}>Home</Heading>
    </VStack>
  );
};

export default Home;
