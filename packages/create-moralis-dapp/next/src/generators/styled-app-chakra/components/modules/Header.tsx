import { Box, Flex, Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Account from './Account';


export default function Header() {
    return (
        <header>
            <Flex justifyContent="space-between" padding="0.5rem" maxW={1100} margin="0 auto">
                <Link as={NextLink} href="https://moralis.io" isExternal>
                    <Image
                        src="/Moralis.svg"
                        width={150}
                        height={45}
                        alt="Moralis logo"
                        transition="filter 0.3s"
                        willChange="filter"
                        _hover={{ filter: 'drop-shadow(0 0 0.8em #1df7f7)' }}
                    />
                </Link>
                <Box>
                    <Account />
                </Box>
            </Flex>
        </header>
    );
}
