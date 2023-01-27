import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Stack,
    Text, Box,
    useColorModeValue,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { FcBookmark, FcFeedback, FcSettings } from 'react-icons/fc'
import { BsCode, BsLink, BsFiles } from 'react-icons/bs'
import { CgProfile, CgPassword } from 'react-icons/cg'
import { MdMiscellaneousServices } from 'react-icons/md'
import { GlobalContext } from '../../context/context'
import DrawerButtons from '../ui-component/drawerButtons'

export default function CDrawer() {
    const { state } = useContext(GlobalContext)
    const tabs = [
        {
            title: `${state?.user?.firstName} ${state?.user?.lastName}`,
            icon: state?.user?.profilePhoto || 'https://avatars.dicebear.com/api/male/username.svg',
            subTabs: [],
            profileTab: true
        },
        {
            title: "My Bookmark",
            icon: FcBookmark,
            subTabs: [{
                title: "Links",
                icon: BsLink,
                type: "assignment",
                path: ""
            }, {
                title: "Code",
                icon: BsCode,
                type: "code",
                path: ""

            }, {
                title: "Files",
                icon: BsFiles,
                type: "file",
                path: ""

            }]
        },
        {
            title: "Setting",
            icon: FcSettings,
            subTabs: [{
                title: 'Profile Setting',
                icon: CgProfile,
                path: ""
            }, {
                title: 'Change Password',
                icon: CgPassword,
                path: ""
            }, {
                title: 'Misc',
                icon: MdMiscellaneousServices,
                path: ""
            }]

        }, {
            title: "Feddback",
            icon: FcFeedback
        }
    ]
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sec_c = useColorModeValue('white', 'gray.800')

    return (
        <>
            <Button
                bg='orange.400'
                color={sec_c}
                _hover={{
                    bg: `orange.600`,
                }}
                mt={5} ml={5}
                p={"0"} w={"10"} h={"10"} borderRadius={"full"}
                onClick={onOpen}  >
                <BiMenuAltLeft size={"18"} />
            </Button>

            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <Stack >
                        <DrawerCloseButton mt={3.5} />
                        <DrawerHeader borderBottomWidth='1px'>Education {' '}
                            <Text as={'span'} color={'orange.600'}>
                                Portal
                            </Text></DrawerHeader>
                    </Stack>
                    <DrawerBody>

                        <Stack spacing={2} >
                            {tabs.map((tab, index) => {
                                return <Box key={index} >
                                    <DrawerButtons tab={tab} />
                                </Box>
                            })}
                        </Stack>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}