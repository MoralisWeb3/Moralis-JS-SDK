import { Heading } from '@chakra-ui/react';
import React from 'react';

interface SectionHeadingProps {
    children: React.ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
    return (
        <Heading size="md" margin="1rem 0">
            {children}
        </Heading>
    );
}
