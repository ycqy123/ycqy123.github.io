import Mock from 'mockjs'

const List = []
const count = 2

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'power|1': ['管理员', '普通用户'],
    created_at: Mock.Random.datetime()
  }))
}

export default [
  {
    url: '/kede_fe/permission/list',
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
