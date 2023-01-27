import { useState } from 'react';
import {
    Box,
    Center,
    TabPanels,
    TabPanel,
    TabList,
    Tabs,
    Tab,
    IconButton,
    Stack
} from '@chakra-ui/react';
import { BsCode, BsFilePdf } from 'react-icons/bs';

import DocList from '../docList';
import CodeForm from '../codeForm';
import SelectFile from '../selectFile';
import LinkForm from "../linkForm";

export default function DocBody() {
    const [isCodeBlock, setIsCodeBlock] = useState(false)
    const [isFileUpload, setIsFileUpload] = useState(false)

    return (
        <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
                <Tab>Post Your Link</Tab>
                <Tab>Post Study Material</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Center>
                        <Box w={600} >
                            <LinkForm />
                        </Box>
                    </Center>
                    <DocList type="assignment" />
                </TabPanel>
                <TabPanel>

                    {
                        isCodeBlock ? <CodeForm handleBlock={setIsCodeBlock} /> :
                            isFileUpload ? <SelectFile handleFile={setIsFileUpload} /> :
                                <Stack direction={'row'} justifyContent='center' spacing={6}>
                                    <IconButton
                                        onClick={() => setIsCodeBlock(true)}
                                        variant='outline'
                                        colorScheme='orange'
                                        aria-label='Call Sage'
                                        fontSize='20px'
                                        icon={<BsCode />} />

                                    <IconButton
                                        onClick={() => setIsFileUpload(true)}
                                        variant='outline'
                                        colorScheme='orange'
                                        aria-label='Call Sage'
                                        fontSize='20px'
                                        icon={<BsFilePdf />} />
                                </Stack>

                    }



                    {/* <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
            </SocialButton> */}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

{/* <Center>
            <Box
                maxW={'xxl'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>

               

            </Box>
        </Center> */}

