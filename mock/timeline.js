const Mock = require('mockjs')

const List = []
const count = 30

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: '@increment',
      timestamp: +Mock.Random.date('T'),
      display_time: '@datetime',
      'target_type|1': ['shop', 'category','item','user'],
      target : '@first',
      'action_type|1':['add','update','delete','order'],
      user_by:'@first'
    }))
  }

  module.exports = [
    {
      url: '/log/list',
      type: 'get',
      response: config => {
        const { page = 1, limit = 20, sort } = config.query
  
        let mockList = List.filter(item => {
          if (id && item.id.indexOf(id) < 0) return false
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
    }
]