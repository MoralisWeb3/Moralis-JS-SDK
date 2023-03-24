import React from 'react';

interface SectionHeadingProps {
    children: React.ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
    return <h3>{children}</h3>;
}
