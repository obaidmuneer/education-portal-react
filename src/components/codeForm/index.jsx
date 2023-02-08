import { useState, useContext } from 'react'
import axios from 'axios'
import {
    Textarea, Button, useColorModeValue,
    Select, Input,
    Stack, Box
} from '@chakra-ui/react'

import { GlobalContext } from '../../context/context'
import useDoc from '../../hooks/useDoc'

const supportedLanguage = ['html', 'css', 'javascript', 'js', 'jsx', 'json', 'text', 'typescript', 'ts', 'tsx', 'python']

const CodeForm = ({ onClose }) => {
    const { state, dispatch } = useContext(GlobalContext)
    const { postCode, isLoading } = useDoc()
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
        const data = {
            codeTitle,
            codeBlock,
            codeLang: selectedLang,
            contentType: 'code',
            classId: state.classId
        }
        postCode(data)
        onClose()
    }

    const bg_c = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
    const focus = { bg: 'whiteAlpha.300' }

    return (
        <>
            <Box as='form' onSubmit={handleData} >
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
                    <Button type='submit' isLoading={isLoading} >Add Code</Button>
                    {/* <Button onClick={() => handleBlock(false)} >Go Back</Button> */}
                </Stack>
            </Box>
            {/* <DocList type={"code"} /> */}
        </>
    )
}

export default CodeForm