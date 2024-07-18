import {
  MdControlPoint,
  MdDiversity2,
  MdInventory,
  MdListAlt,
  MdOutlineInventory2,
  MdOutlineSpaceDashboard,
} from 'react-icons/md'
import { TNavbar } from '@/types/navbar'

const navbar: TNavbar[] = [
  { type: 'link', label: 'dashboard', pathname: '/', link: '/', icon: MdOutlineSpaceDashboard },
  { type: 'heading', label: 'products' },
  {
    type: 'link',
    label: 'products',
    pathname: '/products/list',
    link: '/products/list',
    query: { page: 1, limit: 10 },
    icon: MdOutlineInventory2,
  },
  {
    type: 'link',
    label: 'add_product',
    pathname: '/products/add',
    link: '/products/add',
    icon: MdControlPoint,
  },
  { type: 'heading', label: 'purchased_products' },
  {
    type: 'link',
    label: 'purchased_products',
    pathname: '/purchased-products/list',
    link: '/purchased-products/list',
    query: { page: 1, limit: 10 },
    icon: MdInventory,
  },
  {
    type: 'link',
    label: 'purchased_products_group',
    pathname: '/purchased-products/group',
    link: '/purchased-products/group',
    query: { page: 1, limit: 10 },
    icon: MdDiversity2,
  },
  {
    type: 'link',
    label: 'add_purchased_product',
    pathname: '/purchased-products/add',
    link: '/purchased-products/add',
    icon: MdControlPoint,
  },
  { type: 'heading', label: 'orders' },
  {
    type: 'link',
    label: 'orders',
    pathname: '/orders/list',
    link: '/orders/list',
    query: { page: 1, limit: 10 },
    icon: MdListAlt,
  },
  {
    type: 'link',
    label: 'add_order',
    pathname: '/orders/add',
    link: '/orders/add',
    icon: MdControlPoint,
  },
]

export default navbar
