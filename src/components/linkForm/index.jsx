import { useState, useContext } from 'react';
import axios from 'axios';
import * as yup from 'yup';

import { GlobalContext } from '../../context/context';
import FormikInput from '../formikInput';
import { useFormik } from 'formik';
import { GoDiffAdded } from 'react-icons/go';


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
        },
    });


    const fetchData = async ({ link }) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/docs`, {
                text: link,
                contentType: 'assignment',
                classId: localStorage.getItem('classId')
            })
            console.log(res);
            // dispatch({
            //     type: 'docs',
            //     payload: res.data.docs
            // })
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleData = async () => {
        fetchData();
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit} >
                <FormikInput formik={formik} nameLabel={'link'} placeHolder={'Enter Your Link Here'} icon={<GoDiffAdded />} color={'blue'} />
            </form>
        </div>
    )
}

export default LinkForm