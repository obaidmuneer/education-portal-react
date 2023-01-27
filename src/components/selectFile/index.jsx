import { useContext, useState } from "react";
import {
    AspectRatio,
    Box,
    Button,
    Container,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import { GlobalContext } from "../../context/context";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import useDelete from "../../hooks/useDelete";
import useBookmark from '../../hooks/useBookmark'
import DocList from "../docList";



export default function SelectFile({ handleFile }) {
    const { state, dispatch } = useContext(GlobalContext)
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('')

    const handleData = async () => {
        console.log(file.target.files[0]);
        let formData = new FormData();

        formData.append("myFile", file.target.files[0]);
        formData.append("title", title);
        formData.append("contentType", 'file');
        formData.append("classId", state.classId);
        // console.log(formData);
        // console.log(title);

        const res = await axios({
            method: 'post',
            url: `${state.api}docs/file`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        dispatch({
            type: 'docs',
            payload: [res.data.doc, ...state.docs]
        })

    }

    const buttonProps = {
        icon: <FaTrash />,
        isRound: true,
        'aria-label': 'delete',
    }
    return (
        <Container my="12">
            <Stack alignItems={'center'} >
                <AspectRatio width="64" ratio={1}>
                    <Box
                        borderColor="gray.300"
                        borderStyle="dashed"
                        borderWidth="2px"
                        rounded="md"
                        shadow="sm"
                        role="group"
                        transition="all 150ms ease-in-out"
                        _hover={{
                            shadow: "md"
                        }}
                        initial="rest"
                        animate="rest"
                        whilehover="hover"
                    >

                        <Box position="relative" height="100%" width="500%">
                            <Box
                                position="absolute"
                                top="0"
                                left="0"
                                height="100%"
                                width="100%"
                                display="flex"
                                flexDirection="column"
                            >
                                <Stack
                                    height="100%"
                                    width="100%"
                                    display="flex"
                                    alignItems="center"
                                    justify="center"
                                    spacing="4"
                                >

                                    <Stack p="8" textAlign="center" spacing="1">
                                        <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                                            Drop File here
                                        </Heading>
                                        <Text fontWeight="light">or click to upload</Text>
                                    </Stack>
                                </Stack>
                            </Box>
                            <Input
                                type="file"
                                height="100%"
                                width="100%"
                                position="absolute"
                                top="0"
                                left="0"
                                opacity="0"
                                aria-hidden="true"
                                onChange={(e) => setFile(e)}
                            />
                        </Box>
                    </Box>
                </AspectRatio>
                <Box display={'flex'} justifyContent='space-between' >
                    <Input
                        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                        border={0}
                        _focus={{
                            bg: 'whiteAlpha.300',
                        }}
                        id="file"
                        name="file"
                        placeholder="Enter File Title Here..."
                        width="60"
                        mx={1}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <Button onClick={handleData} >Upload</Button>
                    <Button mx={1} onClick={() => { handleFile(false) }} >Go Back</Button>
                </Box>
            </Stack>
            <DocList type={'file'} />
        </Container>
    );
}
