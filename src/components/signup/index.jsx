import { useState, useRef, useContext } from 'react'
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { GlobalContext } from '../../context/context';

export default function Signup() {
    const { state, dispatch } = useContext(GlobalContext)
    const [showPassword, setShowPassword] = useState(false);
    const [err, setErr] = useState('')
    const firstName = useRef('')
    const lastName = useRef('')
    const email = useRef('')
    const password = useRef('')
    const confirmPassword = useRef('')

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            if (password.current.value !== confirmPassword.current.value)
                throw new Error('Please check your password')
            const result = await axios.post(`${state.api}users/signup`,
                {
                    firstName: firstName.current.value,
                    lastName: lastName.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    confirmPassword: confirmPassword.current.value
                },
                {
                    withCredentials: true
                })
            dispatch({
                type: 'signin',
                payload: result.data
            })
        } catch (error) {
            console.log(error);
            setErr(error.message);
        }
    }

    return (
        <Flex
            // minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={4} mx={'auto'} maxW={'lg'} py={0} px={0}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        {err || 'to enjoy all of our cool features ✌️'}
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    as={'form'}
                    onSubmit={handleSignUp}
                >
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" ref={firstName} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" ref={lastName} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" ref={email} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} ref={password} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="confirmPassword" isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} ref={confirmPassword} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                type={'submit'}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link as={RouterLink} to={'/signin'} color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}