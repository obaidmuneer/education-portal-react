import axios from 'axios'
import { useContext } from 'react'
import { GlobalContext } from '../context/context'

function useBookmark() {
    const { state, dispatch } = useContext(GlobalContext)
    const addBookmark = async (id) => {
        try {
            const result = await axios.put(`${state.api}docs/add-bookmark`, { id }, { withCredentials: true })
            console.log(result);
            dispatch({
                type: 'bookmark',
                payload: result.data.bookmark
            })
        } catch (error) {
            console.log(error);
        }
    }
    const removeBookmark = async (id) => {
        try {
            const result = await axios.delete(`${state.api}docs/remove-bookmark/${id}`, { withCredentials: true })
            console.log(result);
            dispatch({
                type: 'bookmark',
                payload: result.data.bookmark
            })
        } catch (error) {
            console.log(error);
        }
    }

    return [addBookmark, removeBookmark]
}

export default useBookmark