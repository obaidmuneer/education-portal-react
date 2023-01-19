import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import { GoDiffAdded } from 'react-icons/go';

import Form from '../form';
import DocList from '../docList';

export default function DocBody() {
    return (
        <Center>
            <Box
                maxW={'xxl'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>

                <Center>
                    <Box w={600} >
                        <Form icon={<GoDiffAdded />} color='blue' placeHolder='Enter Your Link Here'  />
                    </Box>
                </Center>

                <DocList docs={['asdas', 'asdsad', 'asdsad', 'asdsad', 'asdsad']} />
            </Box>
        </Center>
    );
}