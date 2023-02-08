import {
    Badge, Box, Heading, HStack,
    IconButton, Link, Spacer,
    Stack, StackDivider, VStack
} from '@chakra-ui/react'
import { useContext } from 'react'
import { BsFileCode } from 'react-icons/bs'
import { GlobalContext } from '../../context/context'
import CodeBlocks from '../codeBlock'
import DeleteButton from '../deleteButton'
import BookmarkButton from '../bookmarkButton'

function DocList({ type }) {
    const { state } = useContext(GlobalContext)

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

    return (
        <VStack {...vStackProps}>
            {state?.docs?.map((doc, index) => {
                if (!doc.isDeleted && doc.contentType === type) {
                    return <Stack key={index} >
                        <HStack>
                            {
                                doc.contentType === "assignment" ?
                                    <Link href={doc.text} isExternal >{doc.text}</Link> :
                                    doc.contentType === "file" ?
                                        <>
                                            <IconButton
                                                variant='outline'
                                                colorScheme='blue'
                                                fontSize='20px'
                                                icon={<BsFileCode />}
                                                mx={2} />
                                            <Link href={doc.file} isExternal > {doc.title}</Link></> :
                                        <Heading as='h4' size='md' >
                                            {doc.codeTitle}
                                        </Heading>
                            }
                            <Spacer />

                            <BookmarkButton docId={doc._id} />
                            <DeleteButton docId={doc._id} i={index} />
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