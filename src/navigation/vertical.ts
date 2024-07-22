import {
  MdChecklistRtl,
  MdControlPoint,
  MdDataThresholding,
  MdDiversity2,
  MdHighlightOff,
  MdInventory,
  MdListAlt,
  MdLoop,
  MdOutlineInventory2,
  MdPermIdentity,
  MdPublishedWithChanges,
} from 'react-icons/md'
import { TNavbar } from '@/types/navbar'

const navbar: { [x: string]: TNavbar[] } = {
  client: [
    // dashboard
    { type: 'heading', label: 'dashboard' },
    { type: 'link', label: 'dashboard', pathname: '/', link: '/', icon: MdDataThresholding },
    // products
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
    // purchased products
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
    // orders
    { type: 'heading', label: 'orders' },
    {
      type: 'link',
      label: 'add_order',
      pathname: '/orders/add',
      link: '/orders/add',
      icon: MdControlPoint,
    },
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
      label: 'accepted_orders',
      pathname: '/orders/accepted',
      link: '/orders/accepted',
      query: { page: 1, limit: 10 },
      icon: MdChecklistRtl,
    },
    {
      type: 'link',
      label: 'on_the_way_orders',
      pathname: '/orders/on_the_way',
      link: '/orders/on_the_way',
      query: { page: 1, limit: 10 },
      icon: MdLoop,
    },
    {
      type: 'link',
      label: 'sold_orders',
      pathname: '/orders/sold',
      link: '/orders/sold',
      query: { page: 1, limit: 10 },
      icon: MdPublishedWithChanges,
    },
    {
      type: 'link',
      label: 'cancelled_orders',
      pathname: '/orders/cancelled',
      link: '/orders/cancelled',
      query: { page: 1, limit: 10 },
      icon: MdHighlightOff,
    },
    // suppliers
    { type: 'heading', label: 'suppliers' },
    {
      type: 'link',
      label: 'suppliers',
      pathname: '/suppliers/list',
      link: '/suppliers/list',
      query: { page: 1, limit: 10 },
      icon: MdPermIdentity,
    },
    {
      type: 'link',
      label: 'add_supplier',
      pathname: '/suppliers/add',
      link: '/suppliers/add',
      icon: MdControlPoint,
    },
  ],
  admin: [],
  supplier: [
    // orders
    { type: 'heading', label: 'orders' },
    {
      type: 'link',
      label: 'accepted_orders',
      pathname: '/orders/accepted',
      link: '/orders/accepted',
      query: { page: 1, limit: 10 },
      icon: MdChecklistRtl,
    },
    {
      type: 'link',
      label: 'on_the_way_orders',
      pathname: '/orders/on_the_way',
      link: '/orders/on_the_way',
      query: { page: 1, limit: 10 },
      icon: MdLoop,
    },
    {
      type: 'link',
      label: 'sold_orders',
      pathname: '/orders/sold',
      link: '/orders/sold',
      query: { page: 1, limit: 10 },
      icon: MdPublishedWithChanges,
    },
    {
      type: 'link',
      label: 'cancelled_orders',
      pathname: '/orders/cancelled',
      link: '/orders/cancelled',
      query: { page: 1, limit: 10 },
      icon: MdHighlightOff,
    },
  ],
}

export default navbar
