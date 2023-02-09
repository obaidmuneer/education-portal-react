import * as yup from 'yup'
import { useFormik } from 'formik'

import useDelete from '../../hooks/useDelete'
import CModal from '../ui-component/CModal'
import FormikForm from '../formikForm'
import { FaTrash } from 'react-icons/fa'
import { BiSend } from 'react-icons/bi'

const validationSchema = yup.object().shape({
    password: yup.string().required('Please enter password')
})

const DeleteButton = ({ docId, i }) => {
    const { handleDelete } = useDelete()
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            await handleDelete(docId, i, values.password)
            actions.setSubmitting(false)
        }
    })

    return <>
        <CModal icon={FaTrash} label={'Delete'} header={'Please Enter Password'} >
            <FormikForm
                formik={formik}
                color={'blue'}
                nameLabel={'password'}
                placeHolder={'Enter Password'}
                type='password'
                icon={<BiSend />} />
        </CModal>
    </>
}

export default DeleteButton