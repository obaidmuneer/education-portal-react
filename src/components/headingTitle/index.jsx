import { useContext } from 'react'
import { Heading, Text } from '@chakra-ui/react'
import { GlobalContext } from '../../context/context'

const CText = () => {
  const { state } = useContext(GlobalContext)
  return <Text as={'span'} color={'orange.400'}>
    {state.classId.toUpperCase() || state.error || 'CLASS ID'}
  </Text>
}

const HeadingTitle = ({ nav }) => {
  const { state } = useContext(GlobalContext)
  return (
    <Heading
      fontWeight={600}
      fontSize={nav ? { base: '2xl', sm: '3xl' } : { base: '3xl', sm: '4xl', md: '6xl' }}
      lineHeight={'110%'}>
      {
        state.classId ? 'Class ID ' : !state.error ? 'Enter ' : null
      }
      <CText />
    </Heading>
  )
}

export default HeadingTitle