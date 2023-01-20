import { useState } from 'react'
import { Textarea, Text, Button, useColorModeValue, Select, Heading, Divider } from '@chakra-ui/react'
import Form from '../formikInput'
import CodeBlocks from '../codeBlock'

const supportedLanguage = ['html', 'javascript', 'js', 'jsx', 'json', 'text', 'typescript', 'ts', 'tsx', 'python']

const CodeForm = () => {
    const [blocks, setBlocks] = useState([])
    const [title, setTitle] = useState('')
    const [codeText, setCodeText] = useState('')
    const [selectedLang, setSelectedLang] = useState('')

    const handleData = () => {
        setBlocks([...blocks, { codeText, selectedLang, title }])
    }

    const bg_c = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
    const focus = { bg: 'whiteAlpha.300' }

    return (
        <>
            {/* <Form
                placeHolder={'Enter Title for Code'}
                color='blue'
                hideBtn={true}
                handleChange={setTitle}
                value={title} /> */}

            <Select
                bg={bg_c}
                _focus={focus}
                border={0}

                mt='1'
                placeholder='Select Language'
                onChange={(e) => setSelectedLang(e.target.value)}
                value={selectedLang} >
                {
                    supportedLanguage.map((lang, index) => {
                        return <option key={index} value={lang} >{lang}</option>
                    })
                }
            </Select>

            <Textarea
                value={codeText}
                onChange={(e) => setCodeText(e.target.value)}
                placeholder='Insert Your Code Here'
                size='sm'
                my={1}
                border={0}
                bg={bg_c}
                _focus={focus}
            />
            <Button onClick={handleData} >Add Code</Button>
            {
                blocks.map((block, index) => {
                    return <div key={index} >
                        <Heading as='h4' size='md' textAlign={'left'} mb='1' >
                            {block.title}
                        </Heading>
                        <CodeBlocks code={block.codeText} language={block.selectedLang} />
                        <Divider mt={3} />
                    </div>
                })
            }
        </>
    )
}

export default CodeForm