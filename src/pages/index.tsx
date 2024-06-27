import { Button, useColorMode } from '@chakra-ui/react'

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return <Button onClick={toggleColorMode}>Click me {colorMode}</Button>
}

export default Home
