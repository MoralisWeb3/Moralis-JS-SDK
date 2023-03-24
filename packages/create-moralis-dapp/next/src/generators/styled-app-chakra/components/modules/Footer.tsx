import { Link, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer() {
    return (
        <footer>
            <VStack mt="2rem">
                <Text>
                    🙋 You have questions? Ask them on the{' '}
                    <Link as={NextLink} href="https://forum.moralis.io/" isExternal>
                        Moralis forum
                    </Link>
                </Text>
                <Text>
                    📖 Read more about{' '}
                    <Link as={NextLink} href="https://moralis.io/" isExternal>
                        Moralis
                    </Link>
                </Text>
            </VStack>
        </footer>
    );
}
