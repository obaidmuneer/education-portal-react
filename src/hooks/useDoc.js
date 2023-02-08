import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";

const useDoc = () => {
    const { state, dispatch } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(false)
    
    const getDoc = async () => {
        const id = localStorage.getItem('classId')
        if (!id) return
        try {
            setIsLoading(true)
            const res = await axios.get(`${state.api}docs/${id}`)
            // console.log(res);
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
            dispatch({
                type: 'error',
                payload: error.message
            })
        }
        setIsLoading(false)
    }

    const postLink = async ({ link }) => {
        try {
            const res = await axios.post(`${state.api}docs`, {
                text: link,
                contentType: 'assignment',
                classId: state.classId
            })
            console.log(res.data.doc);
            dispatch({
                type: 'docs',
                payload: [res.data.doc, ...state.docs]
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    const postCode = async (data) => {
        try {
            setIsLoading(true)
            const res = await axios.post(`${state.api}docs/code`, data)
            console.log(res.data.doc);
            dispatch({
                type: 'docs',
                payload: [res.data.doc, ...state.docs]
            })
        } catch (error) {
            console.log(error.message);
        }
        setIsLoading(false)
    }
    const postFile = async (formData) => {
        try {
            setIsLoading(true)
            const res = await axios({
                method: 'post',
                url: `${state.api}docs/file`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            dispatch({
                type: 'docs',
                payload: [res.data.doc, ...state.docs]
            })
        } catch (error) {
            console.log(error.message);
        }
        setIsLoading(false)
    }
    return { getDoc, postLink, postCode, postFile, isLoading }
}

export default useDoc