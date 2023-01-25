import axios from 'axios'
import { useContext } from 'react'
import { GlobalContext } from '../context/context'

function useDelete() {
    const { state, dispatch } = useContext(GlobalContext)
    const handleDelete = async (id, i) => {
        try {
            const res = await axios.delete(`${state.api}docs/${id}`)
            console.log(res.data.doc);
            let docs = [...state.docs]
            docs[i] = res.data.doc
            dispatch({
                type: 'docs',
                payload: docs
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    return [handleDelete]
}

export default useDelete