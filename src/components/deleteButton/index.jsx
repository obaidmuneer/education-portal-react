import { IconButton } from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'
import useDelete from '../../hooks/useDelete'

const DeleteButton = ({ docId, i }) => {
    const { handleDelete, isLoading } = useDelete()

    const buttonProps = {
        icon: <FaTrash />,
        isRound: true,
        'aria-label': 'delete',
    }

    return <IconButton
        onClick={() => handleDelete(docId, i)}
        {...buttonProps}
        isLoading={isLoading} />
}

export default DeleteButton