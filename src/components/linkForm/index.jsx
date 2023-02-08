import { useFormik } from 'formik';
import * as yup from 'yup';
import { GoDiffAdded } from 'react-icons/go';
import {
    Stack, Box,
    FormControl, FormErrorMessage,
    useColorModeValue,
    Input, IconButton,
    InputGroup,
} from '@chakra-ui/react';
import SelectFile from '../selectFile';
import CModal from '../ui-component/CModal';
import CodeForm from '../codeForm';
import useDoc from '../../hooks/useDoc';


let validationSchema = yup.object().shape({
    link: yup.string().required('Please enter a link'),
});

const LinkForm = () => {
    const { postLink } = useDoc()

    const formik = useFormik({
        initialValues: {
            link: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            await postLink(values)
            actions.setSubmitting(false)
            actions.resetForm()
        },
    });

    return (
        <Box mb={4} width='full'>
            <Stack direction={'row'}>
                <Stack as={'form'} width={"full"} onSubmit={formik.handleSubmit} direction={'row'} >
                    <FormControl isInvalid={formik.errors.link && formik.touched.link}>
                        <InputGroup>
                            <Input
                                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                                border={0}
                                _focus={{
                                    bg: 'whiteAlpha.300',
                                }}
                                id={'link'}
                                name={'link'}
                                value={formik.values.link}
                                onChange={formik.handleChange}
                                placeholder={'Enter Your Link Here'}

                            />
                        </InputGroup>
                        <FormErrorMessage>{formik.errors.link}</FormErrorMessage>
                    </FormControl>

                    <IconButton
                        bg={`blue.400`}
                        color={useColorModeValue('white', 'gray.800')}
                        _hover={{
                            bg: `blue.600`,
                        }}
                        aria-label="add link"
                        icon={<GoDiffAdded />}
                        isLoading={formik.isSubmitting}
                        type='submit'
                    />
                </Stack>
                <CModal isCode={true}  >
                    <CodeForm />
                </CModal>
                <CModal >
                    <SelectFile />
                </CModal>
            </Stack>
        </Box>
    )
}

export default LinkForm