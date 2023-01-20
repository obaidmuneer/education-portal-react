import {
    Stack,
    useColorModeValue,
    Input,
    IconButton,
} from '@chakra-ui/react';
import { BiSend } from 'react-icons/bi';
const Form = ({ color, icon, placeHolder, handleChange, value, hideBtn }) => {
    const c = color || 'orange';
    const bg_c = useColorModeValue(`${c}.400`, `${c}.800`)
    const sec_c = useColorModeValue('white', 'gray.800')

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
                    onChange={(e) => handleChange(e.target.value)}
                    value={value}
                />
                {
                    !hideBtn && <IconButton
                        bg={bg_c}
                        color={sec_c}
                        _hover={{
                            bg: `${c}.600`,
                        }}
                        aria-label="Subscribe"
                        icon={icon || <BiSend />}
                    />
                }
            </Stack>
        </>
    )
}

export default Form