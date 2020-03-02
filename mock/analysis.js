import Mock from 'mockjs'

const List = []
const count = 100
const audioText = '欢迎光临一汽奥迪！有什么可以帮您的？奥，我来看看车。请问您之前来过我们展厅吗？没有。我朋友在你们这刚买的。好的，我是您的专属销售顾问李一杰，您可以叫我小李，这是我的名片，很高兴为您服务。谢谢。王哥，我们先休息一下，喝点饮料，店里有茶，柠檬水和果汁，您喝哪种？我帮您去拿。茶吧，谢谢。 王哥今天过来，有没有比较喜欢的车型，想要了解呢？没有明确的，随便看看。明白，您买车主要是日常上班开，还是经常跑高速用？家里边用吧。好的，您打算买轿车还是SUV呢？SUV吧。您现在自己开的这款油耗怎么样？还可以吧，这个无所谓。了解，现在车做的都比较科技感，估计您会喜欢。是吧，看看呗，有什么科技功能。您的大致预算是多少？具体没想好，先看看车吧。好的，没问题，我带您详细介绍下。王哥您可以看下，这款车是最新的国VI环保标准，2.0T发动机。现在必须国VI才能上京牌是吧？对的。4缸涡轮增压，这个您都了解过吧？嗯，网上看过一些资料。汽车之家么，还是官网上？官网。咱们奥迪最优势的地方是变速箱，这车是7挡双离合的。嗯。您这边请，整车是2908的轴距，19寸轮毂，前置四驱。排量有多大，正常高速的话7个油左右，在咱们市区的话10个油左右吧。嗯，那还行。王哥您可以进车里感受下。您不属于初次购车，估计您对车的分析比我还要专业。哈哈，没有没有，今天能试驾么，试试呗。可以的，您把驾驶证和身份证给我一下。王哥，这边请！一会我给您指示路线，请您系好安全带注意安全。这个是全景天窗。方向盘是真皮的。这个中控屏是多大尺寸的？8.3英寸的，全系标配。奥迪的carplay适配性很好，您可以试试。远光灯是氙气么。肯定不是呀，奥迪是注明的灯厂么，都是LED大灯，待会过前面隧道您可以感受下。动力和操控上您感觉怎么样。动力绝对是够用了，方向盘感觉稍微有些重。SUV比轿车的舒适度还是差一些的。是。这边，这边，倒车，倒车，可以了。王哥咱们这边请吧。王哥您先喝杯水，谢谢。您看下，这是我们刚才试车的所有数据，刚才试的是次顶配，这是价格。你先帮我算下整体的价格看看。没问题，您计划全款购车还是贷款购车？贷款吧。连续两年社保或纳税都问题是吧，没问题。您是北京户口还是外地户口？外地户口。北京居住证有的吧，有的。在北京上牌还是外地上牌？上北京牌照，指标这不刚下来么。奥，您运气真好。哈哈，摇了很久了也是。您看下，这是按照最低首付的价格，这是月供，税费，这是整体的价格。好，这车有蓝色的么。有的，但不多，需要的话得给您调。行，我也是刚出来看，对比对比，咱们再联系。没问题，您计划看哪几个品牌车系？嗯，看看宝马、卡迪拉克和奔驰吧。行，那今天先这样，咱们加下微信随时联系。好的，慢走王哥。'
const initialText = '欢迎光临一汽奥迪！有什么可以帮您的？奥，我来看看车。请问您之前来过我们展厅吗？没有。我朋友在你们这刚买的。好的，我是您的专属销售顾问李一杰，您可以叫我小李，这是我的名片，很高兴为您服务。谢谢。王哥，我们先休息一下，喝点饮料，店里有茶，柠檬水和果汁，您喝哪种？我帮您去拿。茶吧，谢谢。 '
const demandText = '王哥今天过来，有没有比较喜欢的车型，想要了解呢？没有明确的，随便看看。明白，您买车主要是日常上班开，还是经常跑高速用？家里边用吧。好的，您打算买轿车还是SUV呢？SUV吧。您现在自己开的这款油耗怎么样？还可以吧，这个无所谓。了解，现在车做的都比较科技感，估计您会喜欢。是吧，看看呗，有什么科技功能。您的大致预算是多少？具体没想好，先看看车吧。好的，没问题，我带您详细介绍下。'
const introduceText = '王哥您可以看下，这款车是最新的国VI环保标准，2.0T发动机。现在必须国VI才能上京牌是吧？对的。4缸涡轮增压，这个您都了解过吧？嗯，网上看过一些资料。汽车之家么，还是官网上？官网。咱们奥迪最优势的地方是变速箱，这车是7挡双离合的。嗯。您这边请，整车是2908的轴距，19寸轮毂，前置四驱。排量有多大，正常高速的话7个油左右，在咱们市区的话10个油左右吧。嗯，那还行。王哥您可以进车里感受下。您不属于初次购车，估计您对车的分析比我还要专业。哈哈，没有没有，今天能试驾么，试试呗。可以的，您把驾驶证和身份证给我一下。王哥，这边请！一会我给您指示路线，请您系好安全带注意安全。这个是全景天窗。方向盘是真皮的。这个中控屏是多大尺寸的？8.3英寸的，全系标配。奥迪的carplay适配性很好，您可以试试。远光灯是氙气么。肯定不是呀，奥迪是注明的灯厂么，都是LED大灯，待会过前面隧道您可以感受下。动力和操控上您感觉怎么样。动力绝对是够用了，方向盘感觉稍微有些重。SUV比轿车的舒适度还是差一些的。是。这边，这边，倒车，倒车，可以了。王哥咱们这边请吧。'
const priceText = '王哥您先喝杯水，谢谢。您看下，这是我们刚才试车的所有数据，刚才试的是次顶配，这是价格。你先帮我算下整体的价格看看。没问题，您计划全款购车还是贷款购车？贷款吧。连续两年社保或纳税都问题是吧，没问题。您是北京户口还是外地户口？外地户口。北京居住证有的吧，有的。在北京上牌还是外地上牌？上北京牌照，指标这不刚下来么。奥，您运气真好。哈哈，摇了很久了也是。您看下，这是按照最低首付的价格，这是月供，税费，这是整体的价格。好，这车有蓝色的么。有的，但不多，需要的话得给您调。行，我也是刚出来看，对比对比，咱们再联系。没问题，您计划看哪几个品牌车系？嗯，看看宝马、卡迪拉克和奔驰吧。行，那今天先这样，咱们加下微信随时联系。好的，慢走王哥。'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    'merchant_name|1': ['门店1', '门店2', '门店3', '门店4', '门店5'],
    customer_name: Mock.Random.cname(),
    customer_mobile: /^1[0-9]{10}$/,
    sales_name: Mock.Random.cname(),
    'car_type|1': ['宝马320Li', '宝马520Li', '宝马318i', '宝马320i', '宝马GT'],
    'audio_title|1': ['12月3日音频', '12月23日音频', '12月13日音频', '11月3日音频', '10月3日音频'],
    'audio_length|1': ['13m:30s', '1h:30m:30s', '3m:20s'],
    audio_created_at: Mock.Random.datetime(),
    importance: '@integer(1, 5)',
    'type|1': ['CN', 'US', 'JP', 'EU']
  }))
}

export default [

  {
    url: '/kede_fe/analysis/get_audio_text',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const i of List) {
        if (i.id === +id) {
          return {
            code: 20000,
            data: {
              audioText: audioText,
              initialText: initialText,
              demandText: demandText,
              introduceText: introduceText,
              priceText: priceText
            }
          }
        }
      }
    }
  },
  {
    url: '/kede_fe/analysis/list',
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
  },

  {
    url: '/kede_fe/analysis/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/kede_fe/analysis/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/kede_fe/analysis/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

