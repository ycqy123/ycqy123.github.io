<template>
  <div class="container">
    <div class="dashboard-container">
      <panel />
    </div>
    <div class="card-container">

      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="客户问题库" name="first">
          <el-card>
            <div class="filter-container">
              <div class="filter-input">
                <el-input v-model="listQuery.query_param" placeholder="" style="width: 200px;" @keyup.enter.native="handleFilter" />
              </div>
              <div class="filter-button">
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                  查询
                </el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" style="margin:10px;" @click="handleCreate()">创建问题</el-button>
              </div>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="审核员">
                      <span>{{ props.row.collector }}</span>
                    </el-form-item>
                    <el-form-item label="所属部门">
                      <span>{{ props.row.department }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <span>{{ props.row.created_at }}</span>
                    </el-form-item>

                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="ID"
                prop="id"
              />
              <el-table-column
                label="问题描述"
                prop="desc"
              />
              <el-table-column
                label="问题分类"
                prop="category"
              />
              <el-table-column
                label="重要度(百分制)"
                prop="count"
              />
            </el-table>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="竞品知识库" name="second">
          <div class="app-list">
            <a-list
              :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
              :data-source="dataSource"
            >
              <a-list-item slot="renderItem" slot-scope="item">
                <a-card :hoverable="true">
                  <a-card-meta>
                    <div slot="title" style="margin-bottom: 3px">{{ item.title }}</div>
                    <a-avatar slot="avatar" class="card-avatar" :src="item.avatar" />
                    <div slot="description" class="meta-cardInfo">
                      <div>
                        <p>新款320Li在10000公里或12个月（以先到者为准）的保养周期内，处于同级别 ...</p>
                      </div>
                    </div>
                  </a-card-meta>
                  <template slot="actions" class="ant-card-actions">
                    <a>
                      <a-icon type="download" />
                    </a>
                    <a>
                      <a-icon type="edit" />
                    </a>
                    <a>
                      <a-icon type="share-alt" />
                    </a>
                  </template>
                </a-card>
              </a-list-item>
            </a-list>

          </div>
        </el-tab-pane>
        <el-tab-pane label="优秀案例库" name="third" />
        <el-tab-pane label="销售话术库" name="fourth" />
        <el-tab-pane label="文件上传" name="fifth" />

      </el-tabs>
    </div>
  </div>

</template>>

<script>
const dataSource = []
for (let i = 0; i < 11; i++) {
  dataSource.push({
    title: '宝马汽车售后服务经营手册',
    avatar: 'https://lh3.googleusercontent.com/proxy/vA0xYq6pB-PgsyP2bPTrUgHuO2Xl6BDw2SDH76SmM5TCDX5TKezjAXHmiWbo9ml_77Y8EQsJo898BtfpMbI5XYQgsdUX'
  })
}
import Panel from './components/Panel'

export default {
  name: 'Training',
  components: { Panel },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      activeName: 'first',
      dataSource,
      tableData: [{
        id: '1',
        desc: '这辆车价钱是否还能再低？',
        category: '价格咨询',
        collector: '张三',
        department: '销售部',
        count: '80',
        created_at: '2019-11-23'
      }, {
        id: '2',
        category: '产品介绍',
        desc: '百公里油耗',
        collector: '张三',
        department: '销售部',
        count: '50',
        created_at: '2019-11-23'

      }, {
        id: '3',
        desc: '这车跟帕萨特一个档次为什么价钱超出这么多？',
        category: '价格咨询',
        collector: '张三',
        department: '销售部',
        count: '80',
        created_at: '2019-11-23'
      }, {
        id: '4',
        category: '价格咨询',
        desc: '为什么你们的车价钱这么高',
        collector: '张三',
        department: '销售部',
        count: '80',
        created_at: '2019-11-23'

      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
.dashboard-container{
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.filter-container{
     display:flex;
     flex-direction: row;
     justify-content: space-around;
    .filter-input{
      margin-top:10px;
      margin-left: 10px;
    }
    .filter-button{
      margin-bottom: 10px;
    }
}
.card-container{
    padding:20px 20px;
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
.app-list {
    .card-avatar{
        width:50px;
        height:50px;
    }
    .meta-cardInfo {
      zoom: 1;
      margin-top: 16px;

      > div {
        position: relative;
        text-align: center;
        float: left;
        width: 100%;

        p {
          line-height: 15px;
          font-size: 24px;
          margin: 0;

          &:first-child {
            color: rgba(0, 0, 0, .45);
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 4px;
          }
        }

      }
    }
  }
}

</style>
