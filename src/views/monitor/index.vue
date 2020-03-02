<template>
  <div class="container">
    <div class="dashboard-container">
      <panel />
    </div>
    <div class="card-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="敏感词排行" name="first">
          <el-button type="primary" icon="el-icon-circle-plus-outline" style="margin:10px;" size="mini" @click="handleCreate">添加敏感词</el-button>
          <a-table
            :columns="questionColumns"
            :row-key="key"
            :pagination="false"
            :data-source="tableData"
          />
        </el-tab-pane>
        <el-tab-pane label="违规录音" name="third">
          <a-table
            :columns="recordColumns"
            :row-key="key"
            :pagination="false"
            :data-source="recordData"
          />
        </el-tab-pane>
        <el-tab-pane label="服务配置" name="second">
          <el-switch
            v-model="value1"
            active-text="按月付费"
            inactive-text="按年付费"
          />
          <el-switch
            v-model="value2"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="按月付费"
            inactive-text="按年付费"
          />
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>

</template>>

<script>
import Panel from './components/Panel'
export default {
  name: 'Monitor',
  components: { Panel },
  data() {
    return {
      activeName: 'first',
      recordColumns: [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt'
      },
      {
        title: '销售员',
        dataIndex: 'sales',
        key: 'sales'
      },
      {
        title: '违规原因',
        dataIndex: 'reason',
        key: 'reason'
      }

      ],
      questionColumns: [{
        title: '排名',
        dataIndex: 'rank',
        key: 'rank'
      },
      {
        title: '敏感词',
        dataIndex: 'question',
        key: 'question'
      },
      {
        title: '次数',
        dataIndex: 'count',
        key: 'count'
      }
      ],
      tableData: [{
        rank: '1',
        question: '太贵了',
        count: '50'
      }, {
        rank: '2',
        question: '不好用',
        count: '34'
      }, {
        rank: '3',
        question: '价格过高',
        count: '22'
      }, {
        rank: '4',
        question: '使用寿命短',
        count: '15'
      }
      ],
      dialogFormVisible: false,
      dialogStatus: '',
      dialogTitle: '成员编辑'
    }
  },
  methods: {
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>>

<style lang="scss" scoped>
.container{
.dashboard-container{
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.card-container{
    padding:20px 20px;
}
}

</style>
