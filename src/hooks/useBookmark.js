import axios from 'axios'
import { useState, useContext } from 'react'
import { GlobalContext } from '../context/context'

function useBookmark() {
    const { state, dispatch } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(false)
    const addBookmark = async (id) => {
        try {
            setIsLoading(true)
            const result = await axios.put(`${state.api}docs/add-bookmark`, { id }, { withCredentials: true })
            console.log(result);
            dispatch({
                type: 'bookmark',
                payload: result.data.bookmark
            })
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }
    const removeBookmark = async (id) => {
        try {
            setIsLoading(true)
            const result = await axios.delete(`${state.api}docs/remove-bookmark/${id}`, { withCredentials: true })
            console.log(isLoading);
            dispatch({
                type: 'bookmark',
                payload: result.data.bookmark
            })
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    return { addBookmark, removeBookmark, isLoading }
}

export default useBookmark