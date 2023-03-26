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

const DeleteButton = ({ docId, i, onClose }) => {
    const { handleDelete, deleteLinks } = useDelete()
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            docId ?
                await handleDelete(docId, i, values.password) :
                await deleteLinks(values.password)
            actions.setSubmitting(false)
            onClose();
        }
    })

    return <FormikForm
        formik={formik}
        color={'blue'}
        nameLabel={'password'}
        placeHolder={'Enter Password'}
        type='password'
        icon={<BiSend />} />
}

const DeleteModal = ({ docId, i }) => {
    return <CModal icon={FaTrash} label={docId ? 'Delete' : 'Delete Links'}
        header={'Please Enter Password'} >
        <DeleteButton docId={docId} i={i} />
    </CModal>
}

export default DeleteModal