import { Badge, Box, HStack, IconButton, Link, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useContext } from 'react'
import { FaTrash } from 'react-icons/fa'
import { GlobalContext } from '../../context/context'
import useDelete from '../../hooks/deleteDoc'

function DocList() {
    const { state, dispatch } = useContext(GlobalContext)
    const [handleDelete] = useDelete()
    console.log(state.docs);
    if (state?.docs?.length === 0)
        return (
            <Box display={'flex'} justifyContent={'center'} >
                <Badge colorScheme='green' p='4' m='4' borderRadius='lg'>
                    Be the one to post the link
                </Badge>
            </Box>
        )

    const vStackProps = {
        p: '2',
        w: '100%',
        // maxW: { base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' },
        // borderColor: 'gray.100',
        borderWidth: '1px',
        borderRadius: 'lg',
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
            {state?.docs?.map((doc, index) => {
                if (!doc.isDeleted && doc.contentType === "assignment") {
                    return <HStack key={index}>
                        <Link href={doc.text} isExternal >{doc.text}</Link>
                        {/* <Text>{doc.text}</Text> */}
                        <Spacer />
                        <IconButton onClick={() => handleDelete(doc._id, index)} {...buttonProps} />
                    </HStack>
                }
            })}
        </VStack>
    )
}

export default DocList