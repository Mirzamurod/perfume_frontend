import { MdOutlineInventory2, MdOutlineSpaceDashboard } from 'react-icons/md'
import { TNavbar } from '@/types/navbar'

const navbar: TNavbar[] = [
  { type: 'link', label: 'dashboard', path: '/', icon: MdOutlineSpaceDashboard },
  { type: 'link', label: 'products', path: '/products/list?page=1&limit=10', icon: MdOutlineInventory2 },
]

export default navbar
