<template>
  <div>
    <el-card style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-user" /></span>
        <span>基本信息</span>
      </div>
      <detail-list>
        <detail-list-item term="客户姓名">付晓晓</detail-list-item>
        <detail-list-item term="性别">男</detail-list-item>
        <detail-list-item term="联系方式">13811111111</detail-list-item>
        <detail-list-item term="购买意向"> 强烈 </detail-list-item>
        <detail-list-item term="创建日期">2019-11-23</detail-list-item>

        <detail-list-item term="业务人员">张三</detail-list-item>

      </detail-list>
    </el-card>

    <el-card style="margin-top: 24px">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-headset" /></span>
        <span>音频信息</span>
      </div>
      <el-container>
        <el-aside>
          <el-row :span="6">
            <div class="audio-user__content">
              <el-row> <span class="row-key">标题: </span><span class="row-value">12月30日李先生音频</span></el-row>
              <el-row> <span class="row-key">时长: </span> <span class="row-value">1h30m30s</span></el-row>
              <el-row> <span class="row-key">录制日期: </span> <span class="row-value">2020/01/15 15:20</span></el-row>

              <!-- <el-row> <span class="row-key">评分: </span>
                <el-rate v-model="rateValue" class="row-value" disabled show-score text-color="#ff9900" />
              </el-row> -->
            </div>
          </el-row>
        </el-aside>
        <el-container>

          <el-header>
            <div class="audio-container">
              <vue-wave-surfer :src="audioFile" />
            </div>
          </el-header>
          <el-main>
            <el-tabs v-model="activeName" tab-position="top" type="border-card" @tab-click="handleClick">
              <el-tab-pane label="语音文本" name="first">
                <span class="tab-content"> {{ text.audioText }} </span>
              </el-tab-pane>
              <el-tab-pane label="初次沟通" name="second">
                <Highlighter
                  class="my-highlight"
                  highlight-class-name="highlight"
                  :search-words="initKeywords"
                  highlight-style="color:red"
                  :auto-escape="true"
                  :text-to-highlight="text.initialText"
                />
              </el-tab-pane>
              <el-tab-pane label="需求评估" name="third">
                <Highlighter
                  class="my-highlight"
                  highlight-class-name="highlight"
                  highlight-style="color:red"
                  :search-words="demandKeywords"
                  :auto-escape="true"
                  :text-to-highlight="text.demandText"
                />
              </el-tab-pane>
              <el-tab-pane label="产品介绍" name="fourth">
                <Highlighter
                  class="my-highlight"
                  highlight-class-name="highlight"
                  highlight-style="color:red"
                  :search-words="introKeywords"
                  :auto-escape="true"
                  :text-to-highlight="text.introduceText"
                />
              </el-tab-pane>
              <el-tab-pane label="价格谈判" name="fifth">
                <span class="tab-content"> {{ text.priceText }} </span>
              </el-tab-pane>
            </el-tabs>

          </el-main>
        </el-container>

      </el-container>
    </el-card>

    <el-card style="margin-top: 24px; margin-bottom:24px" body-style="">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-trophy" /></span>
        <span>销售过程分析 </span>
      </div>
      <div class="card-chart">
        <radar-chat :dataset="customerData" :indicator="customerIndicator" :color="customerColor" />
        <radar-chat :dataset="salesData" :indicator="salesIndicator" :color="salesColor" />
      </div>

    </el-card>

  </div>
</template>

<script>

import DetailList from '@/components/DescriptionList'
import VueWaveSurfer from '../components/VueWaveSurfer'
import RadarChat from '@/components/Charts/RaddarChart'
import { fetchAudioText } from '@/api/analysis'
import Highlighter from 'vue-highlight-words'

const defaultText = {
  audioText: '',
  initialText: '',
  demandText: '',
  introduceText: '',
  priceText: ''
}

const DetailListItem = DetailList.Item
const customerData = [{
  value: [50, 60, 30, 0, 80, 95],
  name: '客户维度',
  label: {
    normal: {
      show: true,
      position: 'top',
      distance: 5,
      color: 'rgba(255,0,0,1)',
      fontSize: 14,
      formatter: function(params) { return params.value }
    }
  }
}
]

const salesData = [{
  value: [20, 60, 70, 90, 40, 35],
  name: '销售维度'
}]
const customerIndicator = [
  { name: '对价格敏感度', max: 100 },
  { name: '对质量要求度', max: 100 },
  { name: '服务态度满意度', max: 100 },
  { name: '商品介绍满意度', max: 100 },
  { name: '对商品了解度', max: 100 }
]

const salesIndicator = [
  { name: '产品介绍能力', max: 100 },
  { name: '斡旋谈判能力', max: 100 },
  { name: '销售服务态度', max: 100 },
  { name: '销售积极性', max: 100 },
  { name: '销售跟进能力', max: 100 }
]
export default {
  name: 'Detail',
  components: {
    DetailList,
    VueWaveSurfer,
    DetailListItem,
    RadarChat,
    Highlighter
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        'agree': '成功',
        'reject': '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter(type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
    }
  },
  data() {
    return {
      inrotRateValue: 4,
      initKeywords: ['喝', '饮', '料', '茶', '果', '汁'],
      demandKeywords: ['油耗', '预算', '上班', '家', '功能', '介绍'],
      introKeywords: ['涡轮增压', '双离合', '前置四驱', '全景天窗', '中控屏', 'LED'],

      text: Object.assign({}, defaultText),
      value: 3.7,
      rateValue: 4,
      tags: [
        { label: '标签1' },
        { label: '标签2' },
        { label: '标签3' },
        { label: '标签4' }

      ],
      activeName: 'first',
      customerData: customerData,
      customerIndicator: customerIndicator,
      salesData: salesData,
      salesIndicator: salesIndicator,
      customerColor: '#668cff',
      salesColor: '#ff1a1a'
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      fetchAudioText(id).then(response => {
        console.log(response.data)
        this.text = response.data
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .el-tabs{
   height:100%;
   border-radius: 15px;
   box-shadow: 2px 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
   .tab-content{
     padding: 20px 20px;
     font-size:16px;
     text-align: justify;
     letter-spacing: normal;
     line-height: 1.5em;
   }
   .text-rate{
     font-weight: bold;
     margin-top:50px;
   }
 }
 .el-aside{
   width:100px;
   .audio-user{
    height:100%;
    border-radius: 15px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    &__content{
      font-size:14px;
      padding:15px 15px;
      .el-progress{
        width:80px;
      }
      .el-row{
        padding:10px 10px;
      }
      .row-key{
        display:inline;
      }
      .row-value{
        display:inline;
        margin-left:5px;
      }
      .row-tag{
        display:flex;
        justify-content: space-around;
        padding:5px 5px;
      }
    }
   }
 }
</style>
