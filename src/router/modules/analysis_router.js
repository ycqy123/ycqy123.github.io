
import Layout from '@/layout'

const analysisRouter = {
  path: '/analysis',
  component: Layout,
  redirect: 'noRedirect',
  name: '复盘助手',
  meta: {
    title: '复盘助手',
    icon: 'nested'
  },
  children: [
    {
      path: '/analysis/stragety',
      component: () => import('@/views/analysis/stragety/index'),
      name: '战略分析',
      meta: { title: '战略分析' }
    },
    {
      path: '/analysis/sales',
      component: () => import('@/views/analysis/sales/index'),
      name: '销售过程分析',
      redirect: '/analysis/sales',
      meta: { title: '销售过程分析' },
      children: [
        {
          path: 'detail/:id(\\d+)',
          component: () => import('@/views/analysis/sales/detail'),
          name: '复盘分析',
          meta: { title: '复盘分析' }
        }
      ]
    }
  ]
}

export default analysisRouter
