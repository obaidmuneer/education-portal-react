import { useState, useContext } from 'react';
import axios from 'axios';
import * as yup from 'yup';

import { GlobalContext } from '../../context/context';
import FormikInput from '../formikInput';
import { useFormik } from 'formik';
import { GoDiffAdded } from 'react-icons/go';
import { Box } from '@chakra-ui/react';


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
        <Box mb={4} >
            <form onSubmit={formik.handleSubmit} >
                <FormikInput formik={formik} nameLabel={'link'} placeHolder={'Enter Your Link Here'} icon={<GoDiffAdded />} color={'blue'} />
            </form>
        </Box>
    )
}

export default LinkForm