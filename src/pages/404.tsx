import { ReactNode } from 'react'
import Link from 'next/link'
import BlankLayout from '@/components/layout/BlankLayout'
import { Box, Button, Text } from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Box display='flex' width='100%' height='100vh' alignItems='center' justifyContent='center'>
      <Box textAlign='center'>
        <Text fontSize='5xl' fontWeight={900} color='GrayText'>
          404
        </Text>
        <Text fontWeight={600} mt={2}>
          Sorry, we couldn't find this page.
        </Text>
        <Text color='GrayText' mt={1}>
          But don't worry, you can find plenty of other things on our homepage.
        </Text>
        <Button as={Link} href='/' variant='outline' mt={3}>
          Back to homepage
        </Button>
      </Box>
    </Box>
  )
}

NotFound.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

NotFound.guestGuard = true

export default NotFound
