import { useState, useContext } from 'react'
import { Textarea, IconButton, Button, useColorModeValue, Select, Heading, Divider, Input, Stack, Box, Spacer } from '@chakra-ui/react'
import Form from '../formikInput'
import CodeBlocks from '../codeBlock'
import { BsStar, BsStarFill } from 'react-icons/bs'

import axios from 'axios'
import { GlobalContext } from '../../context/context'
import useBookmark from '../../hooks/useBookmark'
import DocList from '../docList'

const supportedLanguage = ['html', 'css', 'javascript', 'js', 'jsx', 'json', 'text', 'typescript', 'ts', 'tsx', 'python']

const CodeForm = ({ handleBlock }) => {
    const { state, dispatch } = useContext(GlobalContext)
    const [codeTitle, setCodeTitle] = useState('')
    const [selectedLang, setSelectedLang] = useState('')
    const [codeBlock, setCodeBlock] = useState('')

    const checkCode = async (e) => {
        setCodeBlock(e.target.value)
        let formData = new FormData()
        formData.append('content', e.target.value)
        const res = await axios.post('https://dpaste.com/api/v2/guess-syntax/', formData)
        // console.log(res.data[1]);
        setSelectedLang(res.data[1])
    }

    const handleData = async (e) => {
        e.preventDefault()
        const [select, tit, code] = e.target
        if (!select.value || !tit.value || !code.value) {
            return
        }
        try {
            const res = await axios.post(`${state.api}docs/code`, {
                codeTitle,
                codeBlock,
                codeLang: selectedLang,
                contentType: 'code',
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

    const bg_c = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
    const focus = { bg: 'whiteAlpha.300' }

    return (
        <>
            <form onSubmit={handleData}>


                <Input
                    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                    border={0}
                    _focus={{
                        bg: 'whiteAlpha.300',
                    }}
                    id="codeTitle"
                    name="codeTitle"
                    value={codeTitle}
                    onChange={(e) => setCodeTitle(e.target.value)}
                    placeholder="Enter Code Title Here..."
                />

                <Textarea
                    value={codeBlock}
                    onChange={checkCode}
                    placeholder='Insert Your Code Here'
                    size='sm'
                    my={1}
                    border={0}
                    bg={bg_c}
                    _focus={focus}
                />
                <Select
                    bg={bg_c}
                    _focus={focus}
                    border={0}
                    my='1'
                    placeholder='Select Syntax'
                    onChange={(e) => setSelectedLang(e.target.value)}
                    value={selectedLang} >
                    {
                        supportedLanguage.map((lang, index) => {
                            return <option key={index} value={lang} >{lang}</option>
                        })
                    }
                </Select>
                <Stack  >
                    <Button type='submit' >Add Code</Button>
                    {/* <Button onClick={() => handleBlock(false)} >Go Back</Button> */}
                </Stack>
            </form>
            {/* <DocList type={"code"} /> */}
        </>
    )
}

export default CodeForm