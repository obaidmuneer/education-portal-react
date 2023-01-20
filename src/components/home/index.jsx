import {
    Container,
    Heading,
    Stack,
    Text,
    Show,
    Hide,
    Center,
} from '@chakra-ui/react';
import DocBody from '../docBody';
import ClassId from '../classId';

const Home = () => {
    return (
        <div>
            <Container maxW={'5xl'}>
                <Show below='md'>
                    <Center   >
                        <ClassId />
                    </Center>
                </Show>
                <Hide below='md' >
                    <Stack
                        textAlign={'center'}
                        align={'center'}
                        spacing={{ base: 8, md: 10 }}
                        py={{ base: 5, md: 18 }}>
                        <Heading
                            fontWeight={600}
                            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                            lineHeight={'110%'}>
                            Class ID{' '}
                            <Text as={'span'} color={'orange.400'}>
                                AI
                            </Text>
                        </Heading>

                        {/* <Stack spacing={6} direction={'row'}>
                        <Button
                            rounded={'full'}
                            px={6}
                            colorScheme={'orange'}
                            bg={'orange.400'}
                            _hover={{ bg: 'orange.500' }}>
                            Get started
                        </Button>
                        <Button rounded={'full'} px={6}>
                            Learn more
                        </Button>
                    </Stack> */}

                    </Stack>
                </Hide>
                <DocBody />
            </Container>
        </div>
    )
}

export default Home