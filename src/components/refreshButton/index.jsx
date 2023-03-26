import { Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { BiRefresh } from 'react-icons/bi'
import useDoc from '../../hooks/useDoc'

const RefreshButton = () => {
    const { getDoc, isLoading } = useDoc()

    return (
        <Stack flexDir={'row'} alignItems='center' pos={"absolute"}
            right={"5"}
            mt={5} >
            <Button
                p={"0"}
                w={"10"}
                h={"10"}
                // borderRadius={"full"}
                onClick={getDoc}
                isLoading={isLoading}
            >
                <BiRefresh size={"18"} />
            </Button>
        </Stack>
    )
}

export default RefreshButton