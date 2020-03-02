<template>
  <div :class="className" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/utils/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    indicator: {
      type: Array,
      default: null
    },
    dataset: {
      type: Array,
      default: null
    },
    color: {
      type: String,
      default: 'rgba(127,95,132,.3)'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} :{c}单'
        },
        calculable: true,
        legend: {
          left: 'center',
          bottom: '2',
          color: this.color,
          data: ['初步接洽', '需求探寻', '产品介绍', '价格谈判', '确定购买']
        },
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '60%',
            min: 0,
            max: 100,
            minSize: '20%', // 每一块的最小宽度
            maxSize: '90%', // 每一块的最大快递   一次去除掉尖角
            sort: 'descending',
            gap: 2, // 每一块之间的间隔

            labelLine: {
              length: 20, // 设置每一块的名字前面的线的长度
              lineStyle: {
                width: 1, // 设置每一块的名字前面的线的宽度
                type: 'solid' // 设置每一块的名字前面的线的类型
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#fff', // 每一块的边框颜色
                borderWidth: 0, // 每一块边框的宽度
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)' // 阴影颜色
              }
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: 160, name: '初步接洽', barHeight: 9 },
              { value: 40, name: '需求探寻' },
              { value: 30, name: '产品介绍' },
              { value: 20, name: '价格谈判' },
              { value: 10, name: '确定购买' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
   .chart{
     display:inline-block;
    //  margin-left:30px;
     width: 100%;
     height:350px;
   }
</style>
