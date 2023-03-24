import { Box } from '@chakra-ui/react';
import React from 'react';
import { Footer, Header } from '../modules';

const Default: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            <Box margin="0 auto" p="2rem" maxW={800}>
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default Default;
