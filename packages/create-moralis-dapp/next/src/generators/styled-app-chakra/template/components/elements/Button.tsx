import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';

export default function Button({ children, ...props }: ButtonProps) {
    return <ChakraButton {...props}>{children}</ChakraButton>;
}
