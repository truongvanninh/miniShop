import Index from '@/pages/Index'
import Home from '@/pages/Home'
import Address from '@/pages/Address'
import Product from '@/pages/Product'

var KhachHang = {
    path: '/',
    component: Index,
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/dia-chi',
        component: Address  
      },
      {
        path: '/san-pham/:id',
        name: 'Product',
        component: Product
      },
    ]
  }
  export const KhachHang