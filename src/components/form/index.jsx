import {
    Stack,
    useColorModeValue,
    Input,
    IconButton,
} from '@chakra-ui/react';
import { BiSend } from 'react-icons/bi';
const Form = ({ color, icon, placeHolder }) => {
    const c = color || 'orange';
    return (
        <>
            <Stack direction={'row'} >
                <Input
                    placeholder={placeHolder || 'Enter Class ID'}
                    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                    border={0}
                    _focus={{
                        bg: 'whiteAlpha.300',
                    }}
                />
                <IconButton
                    bg={useColorModeValue(`${c}.400`, `${c}.800`)}
                    color={useColorModeValue('white', 'gray.800')}
                    _hover={{
                        bg: `${c}.600`,
                    }}
                    aria-label="Subscribe"
                    icon={icon || <BiSend />}
                />
            </Stack>
        </>
    )
}

export default Form