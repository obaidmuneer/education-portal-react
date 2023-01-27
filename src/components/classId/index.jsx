import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

import { BiSend } from 'react-icons/bi';
import { GlobalContext } from '../../context/context';
import FormikInput from '../formikInput';
import { useFormik } from 'formik';

let validationSchema = yup.object().shape({
    classId: yup.string().required('Please enter a Class ID'),
});

const ClassId = () => {
    const { state, dispatch } = useContext(GlobalContext)

    const formik = useFormik({
        initialValues: {
            classId: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            console.log(15);
            localStorage.setItem('classId', values.classId);
            fetchData(values.classId)
            actions.setSubmitting(false)
        },
    });


    const fetchData = async (id) => {
        try {
            const res = await axios.get(`${state.api}docs/${id}`)
            console.log(res);
            dispatch({
                type: "docs",
                payload: res.data.docs,
            })
            dispatch({
                type: 'classId',
                payload: id
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const id = localStorage.getItem('classId')

        if (!id) {
            dispatch({
                type: 'classId',
                payload: ''
            })
            return
        }
        formik.setFieldValue("classId", id)
        fetchData(id);
    }, [])

    return (
        <div>
            <form onSubmit={formik.handleSubmit} >
                <FormikInput formik={formik} nameLabel={'classId'} placeHolder={'Enter Class ID'} icon={<BiSend />} />
            </form>
        </div>
    )
}

export default ClassId