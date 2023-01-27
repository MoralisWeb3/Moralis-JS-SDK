import React from 'react';
import { Container } from '@chakra-ui/react';
import { PoweredByMoralis } from '../components/PoweredByMoralis';

const Footer = () => {
  return (
    <Container maxW="container.lg" py={4}>
      <a href="http://moralis.io" target="_blank" rel="noreferrer">
        <PoweredByMoralis />
      </a>
    </Container>
  );
};

export default Footer;
