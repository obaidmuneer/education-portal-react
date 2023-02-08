import {
    Box,
    Center,
    TabPanels,
    TabPanel,
    TabList,
    Tabs,
    Tab,
    useColorModeValue
} from '@chakra-ui/react';

import DocList from '../docList';
import LinkForm from "../linkForm";

export default function DocBody() {

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
