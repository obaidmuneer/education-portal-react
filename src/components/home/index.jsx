import {
    Container,
    Heading,
    Stack,
    Text,
    Show,
    Hide,
    Spinner,
    Button,
} from '@chakra-ui/react';
import DocBody from '../docBody';
import ClassId from '../classId';
import { GlobalContext } from '../../context/context';
import { useContext } from 'react';

const CText = () => {
    const { state } = useContext(GlobalContext)
    return <Text as={'span'} color={'orange.400'}>
        {state.classId.toUpperCase() || state.error || 'CLASS ID'}
    </Text>
}


const Home = () => {
    const { state } = useContext(GlobalContext)
    return (
        <div>
            <Container maxW={'5xl'}>

                <Stack
                    textAlign={'center'}
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 5, md: 18 }}>
                    <Show below='md' >
                        <ClassId />
                    </Show>
                    <Hide below='md' >
                        {
                            state.classId === null ?
                                <Spinner color='orange.400' thickness='4px' size={'xl'} speed='0.6s' emptyColor='gray' /> :

                                <Heading
                                    fontWeight={600}
                                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                                    lineHeight={'110%'}>
                                    {
                                        !state.error ? state.classId ?
                                            <>
                                                Class ID {' '}
                                                <CText />
                                            </> :
                                            <>
                                                Enter {' '}
                                                <CText />
                                            </> :
                                            <CText />
                                    }
                                </Heading>
                        }
                    </Hide>


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
                {state.classId ? <DocBody /> : null}
            </Container>
        </div >
    )
}

export default Home