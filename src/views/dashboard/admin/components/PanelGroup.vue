<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-title">
            意向客户数量
          </div>
          <count-to :start-val="startVal" :end-val="endVal" :duration="2600" class="card-panel-num" />
          <div class="card-panel-trend">
            <trend
              v-for="(data,index) in trendData"
              :key="index"
              :trend-data="data"
            />
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-title">
            产品介绍事件
          </div>
          <count-to :start-val="startVal" :end-val="endVal" :duration="2600" class="card-panel-num" />
          <div class="card-panel-trend">
            <trend
              v-for="(data,index) in trendData"
              :key="index"
              :trend-data="data"
            />
          </div>
        </div>
      </div>
    </el-col> <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-title">
            产品体验事件
          </div>
          <count-to :start-val="startVal" :end-val="endVal" :duration="2600" class="card-panel-num" />
          <div class="card-panel-trend">
            <trend
              v-for="(data,index) in trendData"
              :key="index"
              :trend-data="data"
            />
          </div>
        </div>
      </div>
    </el-col> <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-title">
            价格谈判事件
          </div>
          <count-to :start-val="startVal" :end-val="endVal" :duration="2600" class="card-panel-num" />
          <div class="card-panel-trend">
            <trend
              v-for="(data,index) in trendData"
              :key="index"
              :trend-data="data"
            />
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import Trend from '@/components/Charts/Trend'

export default {
  components: {
    CountTo,
    Trend
  },
  data() {
    return {
      startVal: 0,
      endVal: 100,
      trendData: [
        { title: '比昨天', up: true, count: 15, rate: 10 },
        { title: '比上周', up: false, count: 20, rate: 15 },
        { title: '比上月', up: true, count: 30, rate: 20 }
      ]

    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 150px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
    }

    .card-panel-description {
      margin-bottom: 12px;
      position: relative;
      height: 200px;
      width: 100%;

      .card-panel-title {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        padding: 20px 20px;
      }
      .card-panel-trend{
        float:right;
        margin-top:10px;
        margin-right:30px;
      }
      .card-panel-num {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #000;
        margin-top: 4px;
        margin-bottom: 0;
        font-size: 40px;
        line-height: 30px;
        height: 38px;
        padding-left: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

}
</style>
