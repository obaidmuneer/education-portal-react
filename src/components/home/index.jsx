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
import { GlobalContext } from '../../context/context';
import { useContext } from 'react';

const Home = () => {
    const { state } = useContext(GlobalContext)
    return (
        <div>
            <Container maxW={'5xl'}>
                <Show below='md'>
                    <Center my={2}>
                        <ClassId />
                    </Center>
                </Show>
                <Hide below='md' >
                    <Stack
                        textAlign={'center'}
                        align={'center'}
                        spacing={{ base: 8, md: 10 }}
                        py={{ base: 5, md: 18 }}>
                        {
                            state.classId ? <Heading
                                fontWeight={600}
                                fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                                lineHeight={'110%'}>
                                Class ID {' '}
                                <Text as={'span'} color={'orange.400'}>
                                    {state.classId.toUpperCase()}
                                </Text>
                            </Heading> :
                                <Heading
                                    fontWeight={600}
                                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                                    lineHeight={'110%'}>
                                    Enter {' '}
                                    <Text as={'span'} color={'orange.400'}>
                                        CLASS ID
                                    </Text>
                                </Heading>
                        }

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
                {state.classId ? <DocBody /> : null}
            </Container>
        </div>
    )
}

export default Home