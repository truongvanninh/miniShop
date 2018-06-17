import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// Khách hàng Client
import ClientIndex from '@/pages/client/ClientIndex'
import ClientHome from '@/pages/client/ClientHome'
// import ClientAddress from '@/pages/client/ClientAddress'
import ClientProduct from '@/pages/client/ClientProduct'
import ClientCart from '@/pages/client/ClientCart'

// ADmin
import AdminIndex from '@/pages/admin/AdminIndex'
import AdminProduct from '@/pages/admin/AdminProduct'
import AdminUser from '@/pages/admin/AdminUser'
import AdminFabric from '@/pages/admin/AdminFabric'
import AdminCustomer from '@/pages/admin/AdminCustomer'

// login 
import login from '@/pages/login'
// Auth Firebase
import firebase from 'firebase'

Vue.use(Router)
function guardRoute (to, from, next) {
  if (!firebase.auth().currentUser) {
    next({
      path: '/dang-nhap',
    });
  } else {
    next();
  }
}
let router = new  Router({
  mode: 'history',
  routes: [
    {
      path: '/dang-nhap',
      component: login
    },
    // Quản lý khách hàng
    {
      path: '/',
      component: ClientIndex,
      children: [
        { path: '/', component: ClientHome },
        { path: '/san-pham/:id', name: 'Product',  component: ClientProduct },
        { path: '/mua-sam/gio-hang', name: 'cart', component: ClientCart }
      ]
    },
    // Quản lý admin
    { path: '/hoanghuan',  component: AdminIndex,
      beforeEnter: guardRoute,
      children: [
        { path: '/hoanghuan', component: AdminUser },
        { path: '/hoanghuan/san-pham', component: AdminProduct },
        { path: '/hoanghuan/vai', component: AdminFabric },
        { path: '/hoanghuan/khach-mua', component: AdminCustomer },
      ],
    },
  ]
})
  
export default router