import React from 'react';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

interface AddressInputProps {
    address?: string;
    setAddress: (value: React.SetStateAction<string>) => void;
    fetch: () => void;
}

export default function AddressInput({ address, setAddress, fetch }: AddressInputProps) {
    return (
        <InputGroup>
            <Input
                bg="#19212c"
                pr="4.5rem"
                type="text"
                placeholder="Input address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <InputRightElement width="3.5rem">
                <Button onClick={() => fetch()}>🔎</Button>
            </InputRightElement>
        </InputGroup>
    );
}
