import { Badge, Box, HStack, IconButton, Link, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useContext } from 'react'
import { FaTrash } from 'react-icons/fa'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { GlobalContext } from '../../context/context'
import useDelete from '../../hooks/deleteDoc'
import axios from 'axios'

function DocList() {
    const { state, dispatch } = useContext(GlobalContext)
    const [handleDelete] = useDelete()

    const handleBookmark = async (id) => {
        const result = await axios.put(`${state.api}docs/add-bookmark`, { id }, { withCredentials: true })
        console.log(result);
        dispatch({
            type: 'bookmark',
            payload: result.data.bookmark
        })
    }
    const handleRemoveBookmark = async (id) => {
        const result = await axios.delete(`${state.api}docs/remove-bookmark/${id}`, { withCredentials: true })
        console.log(result);
        dispatch({
            type: 'bookmark',
            payload: result.data.bookmark
        })
    }

    // console.log(state.docs);
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
                        {state.user.bookmark.indexOf(doc._id) > -1 ?
                            <IconButton color={'orange.400'} icon={<BsStarFill />} onClick={() => handleRemoveBookmark(doc._id)} /> :
                            <IconButton icon={<BsStar />} onClick={() => handleBookmark(doc._id)} />
                        }
                        <IconButton onClick={() => handleDelete(doc._id, index)} {...buttonProps} />
                    </HStack>
                }
            })}
        </VStack>
    )
}

export default DocList