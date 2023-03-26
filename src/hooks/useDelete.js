import axios from 'axios'
import { useContext } from 'react'
import { GlobalContext } from '../context/context'

function useDelete() {
    const { state, dispatch } = useContext(GlobalContext)
    const handleDelete = async (id, i, password) => {
        try {
            const res = await axios.delete(`${state.api}docs/${id}`, { data: { password } })
            // console.log(res.data.doc);
            let docs = [...state.docs]
            docs[i] = res.data.doc
            dispatch({
                type: 'docs',
                payload: docs
            })
        } catch (error) {
            console.log(error.response.data.messsage);
        }
    }

    const deleteLinks = async (password) => {
        try {
            const res = await axios.delete(`${state.api}docs`, {
                data: {
                    password,
                    classId: state.classId,
                    contentType: 'assignment'
                }
            })
            // console.log(res.data.docs);
            dispatch({
                type: 'docs',
                payload: res.data.docs
            })
        } catch (error) {
            console.log(error.response.data.messsage);
        }
    }

    return { handleDelete, deleteLinks }
}

export default useDelete