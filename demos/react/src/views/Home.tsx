import { VStack, Heading, Button, Textarea, List, ListItem } from '@chakra-ui/react';
import { useEvmNativeBalance } from '@moralisweb3/react';
import { useState } from 'react';

// const ABI = [
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: '_tokenId',
//         type: 'uint256',
//       },
//     ],
//     name: 'ownerOf',
//     outputs: [
//       {
//         internalType: 'address',
//         name: '',
//         type: 'address',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
// ];

const Home = () => {
  const { data, error } = useEvmNativeBalance({ address: '0x34030D7E833631cDe61f8bC4f6785D00a3999161' });
  console.log('data: ', data);
  console.log('error: ', error);
  return <Heading fontSize="lg">Hello</Heading>;
};

export default Home;
