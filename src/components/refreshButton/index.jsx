import { Button, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { BiRefresh } from 'react-icons/bi'
import useDoc from '../../hooks/useDoc'

const RefreshButton = () => {
    const { getDoc, isLoading } = useDoc()
    const sec_c = useColorModeValue('white', 'gray.800')

    return (
        <Button
            pos={"absolute"}
            right={"5"}
            mt={5}
            p={"0"} w={"10"}
            h={"10"}
            borderRadius={"full"}
            onClick={getDoc}
            isLoading={isLoading}
        >
            <BiRefresh size={"18"} />
        </Button>
    )
}

export default RefreshButton