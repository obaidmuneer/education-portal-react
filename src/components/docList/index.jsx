import {
    Badge, Box, Heading, HStack,
    IconButton, Link, Spacer,
    Stack, StackDivider, VStack
} from '@chakra-ui/react'
import { useContext } from 'react'
import { FaTrash } from 'react-icons/fa'
import { BsFileCode, BsStarFill } from 'react-icons/bs'
import { GlobalContext } from '../../context/context'
import CAlert from '../ui-component/CAlert'
import useDelete from '../../hooks/useDelete'
import useBookmark from '../../hooks/useBookmark'
import CodeBlocks from '../codeBlock'

function DocList({ type }) {
    const { state } = useContext(GlobalContext)
    const [handleDelete] = useDelete()
    const { removeBookmark, isLoading } = useBookmark()

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
        mt: 2,
        // maxW: { base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' },
        // borderColor: 'gray.100',
        borderWidth: '1px',
        borderRadius: 'lg',
        alignItems: 'space-between',
        divider: <StackDivider />,
    }

    const buttonProps = {
        icon: <FaTrash />,
        isRound: true,
        'aria-label': 'delete',
    }

    return (
        <VStack {...vStackProps}>
            {state?.docs?.map((doc, index) => {
                if (!doc.isDeleted && doc.contentType === type) {
                    return <Stack key={index} >
                        <HStack>
                            {doc.contentType === "assignment" ? <Link href={doc.text} isExternal >{doc.text}</Link> : doc.contentType === "file" ? <>
                                <IconButton
                                    variant='outline'
                                    colorScheme='blue'
                                    fontSize='20px'
                                    icon={<BsFileCode />}
                                    mx={2} /> <Link href={doc.file} isExternal > {doc.title}</Link></> :
                                <Heading as='h4' size='md' >
                                    {doc.codeTitle}
                                </Heading>}
                            <Spacer />

                            {/* {state?.user?.bookmark?.indexOf(doc._id) > -1 ?
                                <IconButton color={'orange.400'} icon={<BsStarFill />} onClick={() => removeBookmark(doc._id)} /> :
                                <CAlert id={doc._id} />
                            } */}
                            {state?.user?.bookmark?.findIndex(e => e._id === doc._id) > -1 ?
                                <IconButton color={'orange.400'} icon={<BsStarFill />} onClick={() => removeBookmark(doc._id)} 
                                isLoading={isLoading} /> :
                                <CAlert id={doc._id} />
                            }
                            <IconButton onClick={() => handleDelete(doc._id, index)} {...buttonProps} />

                        </HStack>
                        {
                            type === "code" ? <CodeBlocks code={doc.codeBlock} language={doc.codeLang} /> : null
                        }
                    </Stack>
                }
            })}
        </VStack>
    )
}

export default DocList