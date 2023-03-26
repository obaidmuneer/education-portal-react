import { useFormik } from 'formik';
import * as yup from 'yup';
import { GoDiffAdded } from 'react-icons/go';
import {
    Stack, Box,
} from '@chakra-ui/react';
import SelectFile from '../selectFile';
import CModal from '../ui-component/CModal';
import CodeForm from '../codeForm';
import useDoc from '../../hooks/useDoc';
import { BsCode, BsFolderPlus } from 'react-icons/bs'
import FormikForm from '../formikForm';
import DeleteModal from '../deleteButton';

const validationSchema = yup.object().shape({
    link: yup.string().min(3).required('Please enter a link'),
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
                <FormikForm
                    formik={formik}
                    color={'blue'}
                    nameLabel={'link'}
                    placeHolder={'Enter Your Link'}
                    icon={<GoDiffAdded />} />
                <CModal label={'Add Code'} header={'Add Code'} icon={BsCode}  >
                    <CodeForm />
                </CModal>
                <CModal label={'Upload Files'} header={"Upload Your File"} icon={BsFolderPlus} >
                    <SelectFile />
                </CModal>
                <DeleteModal />
            </Stack>
        </Box>
    )
}

export default LinkForm