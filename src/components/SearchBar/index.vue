<template>
  <div class="filter-container">
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
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'SearchBar',
  directives: { waves },
  props: {
    options: {
      type: Array,
      default: null
    },
    searchProps: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      casOptions: this.options,
      casProps: this.searchProps,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dateValue: ''
    }
  }
}
</script>>

<style lang='scss' scoped>
 .filter-container{
     display:flex;
     justify-content: flex-start;
     padding:20px 10px;
    .filter-input{
      margin-left: 15px;
    }
    .filter-button{
      margin-left:50px;
    }
 }
</style>
