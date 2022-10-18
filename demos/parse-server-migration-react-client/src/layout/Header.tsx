import React from 'react';
import { Container, Spacer, HStack, Text, Flex } from '@chakra-ui/react';
import { Authenticate } from '../components/Authenticate';
import { Connect } from '../components/Connect';
import { MoralisLogo } from '../assets/MoralisLogo';
import { Navigation } from './Navigation';

const Header = () => {
  return (
    <Container maxW="container.lg" py={4}>
      <HStack>
        <Flex wrap="nowrap" alignItems={'start'} mr={4} direction="column">
          <MoralisLogo />
          <Text fontSize={'sm'} fontWeight="800" color="#68738D">
            {'migration demo (v1 to v2)'}
          </Text>
        </Flex>
        <Navigation />
        <Spacer />
        <Authenticate />
        <Connect />
      </HStack>
    </Container>
  );
};

export default Header;
