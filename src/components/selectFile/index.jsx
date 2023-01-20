import {
    AspectRatio,
    Box,
    Button,
    Container,
    Heading,
    Input,
    Stack,
    Text
} from "@chakra-ui/react";

export default function SelectFile() {
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
                        <Box position="relative" height="100%" width="100%">
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
                                accept="image/*"
                            />
                        </Box>
                    </Box>
                </AspectRatio>
                <Button>Upload</Button>
            </Stack>
        </Container>
    );
}
