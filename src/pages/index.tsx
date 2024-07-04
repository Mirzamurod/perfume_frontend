import { Text, useColorMode } from '@chakra-ui/react'

const Home = () => {
  const { colorMode } = useColorMode()

  return <Text>{colorMode.toUpperCase()}</Text>
}

export default Home
