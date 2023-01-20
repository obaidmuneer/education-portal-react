import {
    Box,
    Center,
    useColorModeValue,
    TabPanels,
    TabPanel,
    TabList,
    Tabs,
    Tab
} from '@chakra-ui/react';
import { GoDiffAdded } from 'react-icons/go';

import Form from '../form';
import DocList from '../docList';
import CodeForm from '../codeForm';

export default function DocBody() {
    return (
        <Center>
            <Box
                maxW={'xxl'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>



                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>Post Your Link</Tab>
                        <Tab>Post Study Material</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Center>
                                <Box w={600} >
                                    <Form icon={<GoDiffAdded />} color='blue' placeHolder='Enter Your Link Here' />
                                </Box>
                            </Center>
                            <DocList docs={['asdas', 'asdsad', 'asdsad', 'asdsad', 'asdsad']} />
                        </TabPanel>
                        <TabPanel>
                            <CodeForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>
        </Center>
    );
}