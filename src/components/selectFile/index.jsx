import { useContext, useState } from "react";
import {
    AspectRatio,
    Box,
    Button,
    Center,
    Container,
    Input,
    Spinner,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import { GlobalContext } from "../../context/context";
import useDoc from "../../hooks/useDoc";

export default function SelectFile(props) {
    const { postFile, isLoading } = useDoc()
    const { state } = useContext(GlobalContext)
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('')
    const [preview, setPreview] = useState('')

    const bgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')


    const handleData = async () => {
        // console.log(file.target.files[0]);
        let formData = new FormData();
        formData.append("myFile", file.target.files[0]);
        formData.append("title", title);
        formData.append("contentType", 'file');
        formData.append("classId", state.classId);
        // console.log(formData);
        await postFile(formData)
        props.onClose()
    }

    return (
        <Container >
            {isLoading ? <Center minH={'36vh'}  >
                <Spinner color='orange.400' thickness='6px' minH={100} minW={100} speed='0.6s' emptyColor='gray' />
            </Center> :
                <Stack alignItems={'center'} as="form" onSubmit={handleData} >
                    {
                        preview ? <img src={preview} alt="my file" /> : <AspectRatio width="64" ratio={1}>
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
                                                <Text fontWeight="light">
                                                    {file ? `${file.target.files[0].name} selected` : 'Click to upload'}
                                                </Text>
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
                                        onChange={(e) => {
                                            setFile(e)
                                            if (e.target.files[0].type.split('/')[0] === 'image') {
                                                let url = URL.createObjectURL(e.target.files[0])
                                                setPreview(url)
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </AspectRatio>
                    }
                    <Box display={'flex'}  >
                        <Input
                            bg={bgColor}
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
                        <Button type="submit" >Upload</Button>
                    </Box>
                </Stack>
            }
        </Container>
    );
}
