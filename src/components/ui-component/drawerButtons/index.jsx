import {
    Box, Button, Collapse, useDisclosure,
    Icon, Text, Card, Heading,
    CardBody, Stack, Avatar, Spacer, Badge
} from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../../context/context'

const DrawerButtons = ({ tab }) => {
    const { state } = useContext(GlobalContext)
    const { isOpen, onToggle } = useDisclosure()

    return (
        <div>
            <>
                <Button onClick={onToggle} width={'full'} justifyContent='flex-start' variant='ghost'>
                    <Box width={10} >
                        {tab.profileTab ? <Avatar size={'sm'} name={tab.title} src={tab.icon} /> :
                            <Icon as={tab?.icon} boxSize={6} />}
                    </Box>
                    <Text ml={2} >{tab?.title}</Text>
                </Button>
                <Collapse in={isOpen} animateOpacity>
                    <Box
                        p='5px'
                        mt='1'
                        rounded='md'
                        shadow='md'
                    >
                        {tab?.subTabs?.length > 0 ? <Card>
                            <CardBody>
                                <Stack spacing='2'>
                                    {
                                        tab.subTabs.map((subTab, i) => {
                                            return <Box key={i} as={Button} >
                                                 <Icon as={subTab?.icon} boxSize={4} mr={2} />
                                                <Heading size='xs'>
                                                    {subTab.title}
                                                </Heading>
                                                <Spacer />

                                                {subTab.type ? <Badge colorScheme='red'>
                                                    {state?.user?.bookmark?.filter(e => e.contentType === subTab.type).length}
                                                </Badge>
                                                    : null}
                                            </Box>
                                        })
                                    }
                                </Stack>
                            </CardBody>
                        </Card> : null}
                    </Box>

                </Collapse>
            </>
        </div>
    )
}

export default DrawerButtons