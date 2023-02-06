import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    Icon,
    Tooltip
} from '@chakra-ui/react'
import { BsCode, BsFolderPlus } from 'react-icons/bs'

function CModal({ children, isCode }) {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { onClose })
        }
        return child
    })

    return (
        <>
            <Tooltip label={isCode ? "Add Code" : 'Upload Files'} >
                <Button
                    onClick={() => {
                        setOverlay(<OverlayOne />)
                        onOpen()
                    }}
                >
                    <Icon mx={1} as={isCode ? BsCode : BsFolderPlus} />
                </Button>
            </Tooltip>


            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>{isCode ? "Add Code" : "Upload Your File"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {childrenWithProps}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CModal