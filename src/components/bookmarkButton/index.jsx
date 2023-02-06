import { Box, IconButton } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { BsStarFill } from 'react-icons/bs'
import { GlobalContext } from '../../context/context'
import useBookmark from '../../hooks/useBookmark'
import CAlert from '../ui-component/CAlert'

const BookmarkButton = ({ docId }) => {
    const { state } = useContext(GlobalContext)
    const { removeBookmark, isLoading } = useBookmark()
    return (
        <Box>
            {state?.user?.bookmark?.findIndex(e => e._id === docId) > -1 ?
                <IconButton color={'orange.400'} icon={<BsStarFill />} onClick={() => removeBookmark(docId)}
                    isLoading={isLoading} /> :
                <CAlert id={docId} />
            }
        </Box>
    )
}

export default BookmarkButton