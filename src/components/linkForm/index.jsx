import { useState, useContext } from 'react';
import axios from 'axios';
import * as yup from 'yup';

import { GlobalContext } from '../../context/context';
import { useFormik } from 'formik';
import { GoDiffAdded } from 'react-icons/go';
import {
    Stack, Box,
    FormControl, FormErrorMessage,
    useColorModeValue,
    Input, IconButton, InputRightElement, Button,
    InputGroup,
} from '@chakra-ui/react';
import { BsCode } from 'react-icons/bs';
import SelectFile from '../selectFile';
import CModal from '../ui-component/CModal';
import CodeForm from '../codeForm';


let validationSchema = yup.object().shape({
    link: yup.string().required('Please enter a link'),
});

const LinkForm = () => {
    const { state, dispatch } = useContext(GlobalContext)

    const formik = useFormik({
        initialValues: {
            link: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            fetchData(values)
            actions.setSubmitting(false)
            actions.resetForm()
        },
    });


    const fetchData = async ({ link }) => {
        try {
            const res = await axios.post(`${state.api}docs`, {
                text: link,
                contentType: 'assignment',
                classId: state.classId
            })
            console.log(res.data.doc);
            dispatch({
                type: 'docs',
                payload: [res.data.doc, ...state.docs]
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Box mb={4} width='full'>
            <Stack as={'form'} onSubmit={formik.handleSubmit} direction={'row'}  >
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
                        <InputRightElement>
                            <CModal isCode={true}  >
                                <CodeForm />
                            </CModal>
                        </InputRightElement>
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
                <CModal >
                    <SelectFile />
                </CModal>
            </Stack>
        </Box>
    )
}

export default LinkForm