<template>
  <div class="container">
    <div class="filter-container">
      <div class="filter-input">
        <el-input v-model="listQuery.query_param" placeholder="姓名/电话" style="width: 200px;" @keyup.enter.native="handleFilter" />
        <el-date-picker
          v-model="value2"
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
        <el-button type="primary" icon="el-icon-circle-plus-outline" style="margin:10px;" @click="handleCreate()">新增成员</el-button>
      </div>
    </div>
    <div>
      <div class="table-container">
        <el-table
          :key="tableKey"
          ref="multipleTable"
          v-loading="listLoading"
          highlight-current-row
          fit
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column label="ID" prop="id" sortable="custom" align="center" width="100" :class-name="getSortClass('id')">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="部门" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.merchant_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话" align="center">
            <template slot-scope="{row}">
              <span>{{ row.mobile_number }}</span>
            </template>
          </el-table-column>
          <el-table-column label="职位" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.roles }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="{row}">
              <span>{{ row.created_at }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible" width="30%">
        <div>
          <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="姓名">
              <el-input v-model="sizeForm.name" style="width:200px;" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="sizeForm.mobile" style="width:200px;" />
            </el-form-item>
            <el-form-item label="部门">
              <el-select v-model="sizeForm.merchant" style="width:200px;" placeholder="请选择活动区域">
                <el-option v-for="merchant in merchants" :key="merchant.name" :label="merchant.name" :value="merchant.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="职位">
              <el-select v-model="sizeForm.roles" style="width:200px;" placeholder="请选择活动区域">
                <el-option v-for="power in roles" :key="power.pname" :label="power.pname" :value="power.pname" />
              </el-select>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div></template>

<script>
import { fetchList } from '@/api/member'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  name: 'Member',
  directives: { waves },
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      sizeForm: {
        name: '许洋',
        mobile: '11477347129',
        sales_name: '周秀英',
        delivery: false,
        type: [],
        merchant: '销售部',
        power: '销售员',
        desc: ''
      },
      tags: [
        { label: '标签1' },
        { label: '标签2' },
        { label: '标签3' },
        { label: '标签4' },
        { label: '标签5' },
        { label: '标签6' }
      ],
      merchants: [
        { name: '销售部' },
        { name: '市场部' },
        { name: '产品研发部' },
        { name: '培训部' },
        { name: '售后部' }
      ],
      // TODO: change power to permission
      roles: [
        { pname: '区域负责人' },
        { pname: '销售' }
      ],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      dialog_title: '成员编辑'
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
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
     flex-direction: row;
     justify-content: space-around;
     padding:20px 20px;
    .filter-input{
      margin-top:10px;
      margin-left: 10px;
    }
    .filter-button{
      margin-bottom: 10px;
    }
 }
 .table-container{
    padding:10px 10px;
 }
}
</style>
