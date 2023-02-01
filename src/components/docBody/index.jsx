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
    Stack,
    useColorModeValue
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
        <>
            <Center>
                <Box
                    maxW={'xxl'}
                    w={'full'}
                    h={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
                    <Center >
                        <LinkForm />
                    </Center>
                    {/* <DocList type="assignment" />
                    <DocList type="file" />
                    <DocList type="code" /> */}


                    <Tabs isFitted variant='enclosed'>
                        <TabList mb='1em'>
                            <Tab>Links</Tab>
                            <Tab>Files</Tab>
                            <Tab>Codes</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <DocList type="assignment" />
                            </TabPanel>
                            <TabPanel>
                                <DocList type="file" />
                            </TabPanel>
                            <TabPanel>
                                <DocList type="code" />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>

            </Center>

        </>
    );
}
