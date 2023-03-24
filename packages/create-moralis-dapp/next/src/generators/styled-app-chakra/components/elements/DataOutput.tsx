import { Box } from '@chakra-ui/react';
import React from 'react';

interface DataOutputProps {
    children: React.ReactNode;
}
export default function DataOutput({ children }: DataOutputProps) {
    return (
        <Box bg="#19212c" padding="1rem" borderRadius="0.375rem" overflowX="scroll">
            <pre>{children}</pre>
        </Box>
    );
}
