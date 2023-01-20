import { Badge, Box, HStack, IconButton, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaTrash } from 'react-icons/fa'

function DocList({ docs, deleteTodo }) {
    if (docs.length === 0)
        return (
            <Box display={'flex'} justifyContent={'center'} >
                <Badge colorScheme='green' p='4' m='4' borderRadius='lg'>
                    Be the one to post the link
                </Badge>
            </Box>
        )

    const vStackProps = {
        // p: '2',
        // w: '100%',
        // maxW: { base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' },
        // borderColor: 'gray.100',
        // borderWidth: '1px',
        // borderRadius: 'lg',
        alignItems: 'space-between',
        divider: <StackDivider />
    }

    const buttonProps = {
        icon: <FaTrash />,
        isRound: true,
        'aria-label': 'delete',
    }

    return (
        <VStack {...vStackProps}>
            {docs?.map((doc, index) => (
                <HStack key={index}>
                    <Text>{doc}</Text>
                    <Spacer />
                    <IconButton onClick={() => deleteTodo(docs.id)} {...buttonProps} />
                </HStack>
            ))}
        </VStack>
    )
}

export default DocList