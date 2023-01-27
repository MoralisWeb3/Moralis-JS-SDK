import { Container, Spacer, HStack } from '@chakra-ui/react';
import { MoralisLogo } from '../assets/MoralisLogo';
import { Navigation } from './Navigation';

const Header = () => {
  return (
    <Container maxW="container.lg" py={4}>
      <HStack>
        <MoralisLogo />
        <Navigation />
        <Spacer />
      </HStack>
    </Container>
  );
};

export default Header;
