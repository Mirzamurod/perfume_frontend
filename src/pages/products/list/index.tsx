import { Box } from '@chakra-ui/react'
import TableHeader from '@/view/product/TableHeader'
import ProductTable from '@/view/product/ProductTable'

const Products = () => {
  return (
    <Box>
      <TableHeader />
      <ProductTable />
    </Box>
  )
}

export default Products
