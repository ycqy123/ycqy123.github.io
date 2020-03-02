<template>
  <div class="container">
    <div class="filter-container">
      <div class="filter-input">
        <el-input v-model="listQuery.query_param" placeholder="客户姓名/客户电话/销售姓名" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-select v-model="listQuery.car_type" placeholder="产品服务" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in carTypeOptions" :key="item.key" :label="item.display_name" :value="item.display_name" />
        </el-select>
        <!-- <el-select v-model="listQuery.importance" placeholder="评分" clearable style="width: 90px" class="filter-item">
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
        </el-select> -->
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
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          导出EXCEL
        </el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      ref="multipleTable"
      v-loading="listLoading"
      highlight-current-row
      fit
      :data="list"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="50" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.merchant_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.customer_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户电话" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.customer_mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column label="销售姓名" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品服务" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.car_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="音频标题" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.audio_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="音频时长" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.audio_length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.audio_created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分" width="80px">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="{name:'detail',params:{id:row.id}}">
            <el-button type="primary" size="mini">
              复盘
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/analysis'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const carTypeOptions = [
  { key: '1', display_name: '宝马' },
  { key: '2', display_name: '奔驰' },
  { key: '3', display_name: '大众' },
  { key: '4', display_name: '现代' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const carTypeKeyValue = carTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'SalesAnalysis',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return carTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      audioFile: '',
      activeName: 'second',
      rateValue: 4,
      buyRate: 4,
      tags: [
        { label: '标签1' },
        { label: '标签2' },
        { label: '标签3' },
        { label: '标签4' }

      ],
      dateValue: '',
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
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3, 4, 5],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    format(percentage) {
      return this.process.percentage === 100 ? '满' : `${this.process.percentage}%`
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // createData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
    //       this.temp.author = 'vue-element-admin'
    //       createArticle(this.temp).then(() => {
    //         this.list.unshift(this.temp)
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: 'Success',
    //           message: 'Created Successfully',
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // },
    openDialog(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    setVisible(value) {
      console.log('@@@@@@@', value)
      this.dialogFormVisible = false
    },
    // updateData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       const tempData = Object.assign({}, this.temp)
    //       tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
    //       updateArticle(tempData).then(() => {
    //         const index = this.list.findIndex(v => v.id === this.temp.id)
    //         this.list.splice(index, 1, this.temp)
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: 'Success',
    //           message: 'Update Successfully',
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // },

    // handleFetchPv(pv) {
    //   fetchPv(pv).then(response => {
    //     this.pvData = response.data.pvData
    //     this.dialogPvVisible = true
    //   })
    // },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  .filter-container{
     display:flex;
     justify-content: flex-start;
     padding:10px 20px;
    .filter-input{
      margin-left: 5px;
    }
    .filter-button{
      margin-left:10px;
    }
 }

 .el-table{
    overflow: auto;
    width: 100%;
    padding:10px 10px;
 }

}
</style>
