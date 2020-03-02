<template>
  <div class="container">
    <search-bar :options="casOptions" :search-props="casProps" />
    <div class="chart-card">
      <el-card>
        <div class="card-title"> 客户关注度排行 </div>
        <pie :bar-data="barData" />
      </el-card>
      <el-card>
        <div class="card-title"> 客户质疑排行 </div>
        <a-table
          :columns="questionColumns"
          :row-key="key"
          :pagination="false"
          :data-source="tableData"
        />
      </el-card>
      <el-card>
        <div class="card-title"> 购买深层原因 </div>
        <a-table
          :columns="reasonColumns"
          :row-key="key"
          :pagination="false"
          :data-source="reasonData"
        />
      </el-card>
      <el-card>
        <div class="card-title"> 客户画像 </div>
        <doughnut :data="douData" />
      </el-card>
      <el-card>
        <div class="card-title"> 销售漏斗 </div>
        <funnel />
      </el-card>
      <el-card>
        <div class="card-title"> 被提及竞品排行 </div>
        <a-table
          :columns="productColumns"
          :row-key="key"
          :pagination="false"
          :data-source="productData"
        />
      </el-card>
      <el-card>
        <div class="card-title"> 品牌对比 </div>
        <a-table
          :columns="modelColumns"
          :row-key="key"
          :pagination="false"
          :data-source="modelData"
        />
      </el-card>
    </div>
  </div>

</template>>

<script>
import SearchBar from '@/components/SearchBar'
import Pie from '@/components/Charts/PieChart'
import Doughnut from '@/components/Charts/Doughnut'
import Funnel from '@/components/Charts/Funnel'

const douData = {
  datasets: [
    {
      backgroundColor: ['rgba(220,20,60, 0.8)', 'rgba(255,130,71,0.8)', '#67C23A', '#409EFF'],
      data: [20, 10, 30, 10]
    }
  ],
  labels: ['个体户', '企业员工', '自由职业者', '公务员']

}

export default {
  name: 'Stragety',
  components: {
    SearchBar,
    Pie,
    Doughnut,
    Funnel
  },
  data() {
    return {
      productColumns: [{
        title: '排名',
        dataIndex: 'rank',
        key: 'rank'
      },
      {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand'
      },
      {
        title: '提及次数',
        dataIndex: 'count',
        key: 'count'
      }
      ],
      productData: [{
        rank: '1',
        brand: '宝马',
        count: '20'
      }, {
        rank: '2',
        brand: '奔驰',
        count: '15'
      }, {
        rank: '3',
        brand: '大众',
        count: '13'

      }, {
        rank: '4',
        brand: '本田',
        count: '10'
      },
      {
        rank: '5',
        brand: '丰田',
        count: '8'
      }],
      modelColumns: [{
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand'
      },
      {
        title: '优点',
        dataIndex: 'advantage',
        key: 'advantage'
      },
      {
        title: '缺点',
        dataIndex: 'weakness',
        key: 'weakness'
      }
      ],
      modelData: [{
        brand: '宝马',
        advantage: '油耗低',
        weakness: '起步慢'
      }, {
        brand: '奔驰',
        advantage: '后排宽敞、储物空间大',
        weakness: '油耗高'
      }, {
        brand: '大众',
        advantage: '风噪小，空间大',
        weakness: '轮毂小'

      }, {
        brand: '本田',
        advantage: '风噪小，耗油低',
        weakness: '前排储物空间狭窄'
      },
      {
        brand: '丰田',
        advantage: '车身结构结实',
        weakness: '油耗高'
      }],
      reasonColumns: [{
        title: '排名',
        dataIndex: 'rank',
        key: 'rank'
      },
      {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand'
      },
      {
        title: '提及次数',
        dataIndex: 'count',
        key: 'count'
      }
      ],

      reasonData: [{
        rank: '1',
        brand: '方便上下班',
        count: '20'
      }, {
        rank: '2',
        brand: '商务需要',
        count: '15'
      }, {
        rank: '3',
        brand: '家庭自用',
        count: '13'

      }, {
        rank: '4',
        brand: '高速通行方便',
        count: '10'
      },
      {
        rank: '5',
        brand: '其他',
        count: '8'
      }],

      questionColumns: [{
        title: '排名',
        dataIndex: 'rank',
        key: 'rank'
      },
      {
        title: '问题',
        dataIndex: 'question',
        key: 'question'
      }],

      tableData: [{
        rank: '1',
        question: '价格贵'
      }, {
        rank: '2',
        question: '质量存在问题'
      }, {
        rank: '3',
        question: '油耗会不会高'
      }, {
        rank: '4',
        question: '售后问题'
      },
      {
        rank: '5',
        question: '其他'
      }],
      douData: douData,
      barData: [
        { value: 100, name: '质量' },
        { value: 80, name: '价格' },
        { value: 90, name: '竞争' },
        { value: 20, name: '服务' },
        { value: 10, name: '易用性' },
        { value: 59, name: '其他' }
      ],
      casProps: { multiple: true },
      casOptions: [{
        value: 1,
        label: '销售部',
        children: [{ value: 3, label: '张三' },
          { value: 4, label: '李四' },
          { value: 5, label: '王小二' }]
      },
      {
        value: 2,
        label: '售后部',
        children: [{ value: 3, label: '丽萨' },
          { value: 4, label: '杰克' },
          { value: 5, label: '凯文' }]
      },
      {
        value: 3,
        label: '质检部',
        children: [{ value: 3, label: '噜噜噜' },
          { value: 4, label: '小黑' },
          { value: 5, label: '王小二' }]
      }

      ]
    }
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    }
  }
}
</script>

<style lang='scss' scoped>
  .container{
   padding: 32px;
   position: relative;
   .chart-card{
       display:flex;
       flex-direction: row;
       justify-content: space-around;
       align-content: space-between;
       flex-wrap: wrap;
       .el-card{
           width:45%;
           height:auto;
           padding: 20px 20px;
           margin-top: 20px
       }
       .card-title{
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom:10px;
       }
   }
  }
</style>
