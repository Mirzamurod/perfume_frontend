import i18n from './i18n'

const eng = {
  search: 'Search',
  login: 'Login',
  products: 'Products',
  product: 'product',
  see_all: 'See all',
  show_more: 'Show more',
  price: 'Price',
  reset: 'Reset',
  sort: 'Sort',
  all: 'All',
  expensive_first: 'Expensive first',
  cheap_first: 'Cheap first',
  add_to_cart: 'Add to cart',
  som: 'soum',
  your_card: 'Your cart',
  delete: 'Delete',
  total: 'Total',
  phone: 'Phone number',
  phone_required: 'Phone number is required',
  address: 'Address',
  address_required: 'Address is required',
  payment_method: 'Payment method',
  quantity: 'Quantity',
  go_to_cart: 'Go to cart',
  delivery: 'Delivery',
  choose_from_map: 'Choose from map',
  optional: 'optional',
  register: 'Register',
  password: 'Password',
  password_required: 'Password is required',
  must: 'Must be one uppercase, one lowercase, one number and special case character',
  not_authorized: 'Not authorized',
  not_authorized_no_token: 'Not authorized, no token',
  not_authorized_as_an_admin: 'Not authorized as an admin',
  not_authorized_as_a_client: 'Not authorized as an client',
  must_have_perfume: 'Must have at least 1 perfume',
  order_added: 'Order successfully added',
  order_data_invalid: 'Order data is invalid',
  order_not_found: 'Order not found',
  order_updated: 'Order successfully updated',
  order_deleted: 'Order successfully deleted',
  product_not_found: 'Product not found',
  product_already_exists: 'Product already exists',
  product_added: 'Product successfully added',
  product_updated: 'Product successfully updated',
  product_deleted: 'Product successfully deleted',
  user_not_found: 'User not found',
  user_already_exists: 'User already exists',
  user_added: 'User successfully added',
  invalid_user_data: 'User data is invalid',
  phone_or_password_wrong: 'Phone or password is wrong',
  user_updated: 'User successfully updated',
  current_password_wrong: 'Current password is wrong',
  client_added: 'Client successfully added',
  invalid_client_data: 'Client data is invalid',
  client_not_found: 'Client not found',
  client_updated: 'Client successfully updated',
  client_deleted: 'Client successfully deleted',
  supplier_not_found: 'Supplier not found',
  supplier_updated: 'Supplier successfully updated',
  supplier_deleted: 'Supplier successfully deleted',
  dashboard: 'Dashboard',
  add_product: 'Add product',
  edit_product: 'Edit product',
  name: 'Name',
  color: 'Color',
  season: 'Season',
  sale_price: 'Sale price',
  action: 'Action',
  type: 'Type',
  gender: 'Gender',
  smell: 'Smell',
  persistence_of_the_smell: 'Persistence of the smell (day)',
  purchase_price: 'Purchase price',
  go_to_products: 'Go to Products',
  close: 'Close',
  delete_product: 'Delete product',
  perfume: 'Perfume',
  muskambar: 'Muskambar',
  no_type: 'This is the wrong type',
  type_required: 'Type is required',
  winter: 'Winter',
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Autumn',
  no_season: 'This is the wrong season',
  season_required: 'Season is required',
  name_required: 'Name is required',
  color_required: 'Color is required',
  smell_required: 'Smell is required',
  purchase_price_required: 'Purchase price is required',
  min_1: 'At least 1 should have been',
  persistence_required: 'Persistence of the smell is required',
  sale_price_required: 'Sale price is required',
  boy: 'Boy',
  girl: 'Girl',
  no_gender: 'This is the wrong gender',
  orders: 'Orders',
  add_order: 'Add order',
  no_data: 'No data',
  purchased_products: 'Purchased products',
  add_purchased_product: 'Add purchased product',
  count: 'Count',
  purchased_price: 'Purchased price',
  choose_product: 'Choose product',
  go_to_purchased_products: 'Go to purchased products',
  product_required: 'Product is required',
  count_required: 'Count is required',
  purchased_price_required: 'Purchased price is required',
  edit_purchased_product: 'Edit purchased product',
  purchased_products_group: 'Purchased products (group)',
  suppliers: 'Suppliers',
  add_supplier: 'Add supplier',
  finished_orders: 'Finished orders',
  edit_supplier: 'Edit supplier',
  go_to_suppliers: 'Go to supplier',
  go_to_orders: 'Go to orders',
  alert_autocomplete:
    "You may have autocomplete turned on, disable password if you don't want to change the password.",
  order: 'Order',
  delivery_date: 'Delivery date',
  supplier: 'Supplier',
  choose_supplier: 'Choose supplier',
  edit_order: 'Edit Order',
  are_you_sure: 'Are you sure you want to delete?',
  confirmation: 'Confirmation',
  delete_purchased_product: 'Delete purchased product',
  delete_supplier: 'Delete supplier',
  view_order: 'View order',
  delete_order: 'Delete order',
  cash: 'Cash',
  card: 'With a card',
  no_payment_method: 'This is the wrong payment method',
  payment_method_required: 'Payment method is required',
  choose_payment_method: 'Choose payment method',
  accepted: 'Accepted',
  on_the_way: 'On the way',
  sold: 'Sold',
  cancelled: 'Cancelled',
  accepted_orders: 'Accepted orders',
  on_the_way_orders: 'Orders on the way',
  sold_orders: 'Sold orders',
  cancelled_orders: 'Cancelled orders',
  status: 'Status',
}

export type TranslationKeys = keyof typeof eng

export const t = (key: TranslationKeys) => i18n.t(key)

export default eng
