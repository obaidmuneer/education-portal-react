import axios from 'axios'
import { useContext, useState } from 'react'
import { GlobalContext } from '../context/context'

function useDelete() {
    const { state, dispatch } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(false)
    
    const handleDelete = async (id, i) => {
        try {
            setIsLoading(true)
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
        setIsLoading(false)
    }

    return { handleDelete, isLoading }
}

export default useDelete