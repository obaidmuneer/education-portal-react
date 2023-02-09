import { useContext, useEffect } from 'react';
import FormikForm from '../formikForm';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useDoc from '../../hooks/useDoc';
import { GlobalContext } from '../../context/context';

import { BiSend } from 'react-icons/bi';

let validationSchema = yup.object().shape({
    classId: yup.string().required('Please enter a Class ID'),
});

const ClassId = () => {
    const { dispatch } = useContext(GlobalContext)
    const { getDoc } = useDoc()

    const formik = useFormik({
        initialValues: {
            classId: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            localStorage.setItem('classId', values.classId)
            await getDoc()
            actions.setSubmitting(false)
        },
    });

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
        getDoc();
    }, [])

    return (
        <div>
            <FormikForm formik={formik} nameLabel={'classId'} placeHolder={'Enter Class ID'} icon={<BiSend />} />
        </div>
    )
}

export default ClassId