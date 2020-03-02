import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    'merchant_name|1': ['门店1', '门店2', '门店3', '门店4', '门店5'],
    name: Mock.Random.cname(),
    mobile_number: /^1[0-9]{10}$/,
    'tags|1': ['初次', '老客', '测试标签'],
    sales_name: Mock.Random.cname(),
    created_at: Mock.Random.datetime()
  }))
}

export default [
  {
    url: '/kede_fe/customers/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }]
