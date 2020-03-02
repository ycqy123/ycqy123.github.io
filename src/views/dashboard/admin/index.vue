<template>

  <div class="dashboard-editor-container">
    <!-- <div class="filter-container">
      <el-cascader
        :options="casOptions"
        :props="casProps"
        placeholder="按部门/员工姓名"
        clearable
      />
      <div class="filter-input">
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </div>
      <div class="filter-button">
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查询
        </el-button>
      </div>
    </div> -->
    <search-bar :options="casOptions" :search-props="casProps" />
    <panel-group />

    <el-card class="chart-card">
      <span class="chart-card__title"> 产品事件图表</span>
      <div class="chart-card__chart-wrapper">
        <bar :data="barData" />
      </div>
    </el-card>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import Bar from '@/components/Charts/Bar'
import SearchBar from '@/components/SearchBar'

const barData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: '产品介绍',
      backgroundColor: '#ff80bf',
      data: [140, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    },
    {
      label: '产品体验',
      backgroundColor: '#80b3ff',
      data: [40, 120, 12, 39, 120, 340, 39, 80, 4, 20, 112, 11]
    },
    {
      label: '价格谈判',
      backgroundColor: '#df80ff',
      data: [40, 20, 212, 39, 50, 30, 39, 110, 20, 20, 12, 11]
    }
  ]
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    Bar,
    SearchBar
  },
  data() {
    return {
      barData: barData,
      casProps: { multiple: true },
      casOptions: [{
        value: 'sales',
        label: '销售部',
        children: [
          { value: 'sales1', label: '销售一部',
            children: [
              { value: 3, label: '张三' },
              { value: 4, label: '李四' },
              { value: 5, label: '王小二' }
            ]
          },
          { value: 'sales2', label: '销售二部',
            children: [
              { value: 3, label: '张三' },
              { value: 4, label: '李四' },
              { value: 5, label: '王小二' }
            ] },
          { value: 'sales3', label: '销售三部',
            children: [
              { value: 3, label: '张三' },
              { value: 4, label: '李四' },
              { value: 5, label: '王小二' }
            ]
          }
        ]
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

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  position: relative;
  .filter-container{
     display:flex;
     justify-content: flex-start;
     padding:10px 10px;
    .filter-input{
      margin-left: 15px;
    }
    .filter-button{
      margin-left:50px;
    }
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.chart-card{
  &__title{
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        padding: 20px 20px;
  }
@media (max-width:1024px) {
  &__chart-wrapper {
    padding: 8px;
  }
}
}
</style>
