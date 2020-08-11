/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/shop',
  component: Layout,
  redirect: '/shop/info',
  name: 'Table',
  meta: {
    title: 'Shop Info',
    icon: 'table'
  },
  children: [
    {
      path: 'register',
      component: () => import('@/views/table/shopRegister'),
      name: 'Registration',
      meta: { title: 'Registration', affix: true }
    },
    {
      path: '',
      component: () => import('@/views/table/shopAdmin'),
      name: 'Info',
      meta: { title: 'Info', affix: true }
    }
  ]
}
export default tableRouter
