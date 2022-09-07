import React from 'react';
import { Container } from '@chakra-ui/react';

interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <Container maxW="container.lg" pt={8} pb={4}>
      {children}
    </Container>
  );
};

export default Main;
