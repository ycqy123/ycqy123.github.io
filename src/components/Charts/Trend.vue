<template>
  <div class="chart-trend">
    <span class="trend-count"> {{ trendData.count }} </span>
    <span class="trend-title"> {{ trendData.title }} </span>
    <span class="trend-rate">{{ trendData.rate }}%</span>
    <span :class="['trend-icon', trend]"><a-icon :type="'caret-' + trend" /></span>
  </div>
</template>

<script>
export default {
  name: 'Trend',
  props: {
    trendData: {
      type: Object,
      required: true
    },
    type: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      trend: this.type && 'up' || 'down',
      rate: this.percentage
    }
  },
  created() {
    this.trend = this.trendData.up ? 'up' : 'down'
  }
}
</script>

<style lang="less" scoped>
  .chart-trend {
    display: flex;
    flex-direction: row;
    font-size: 10px;
    .trend-count{
      font-weight:bold;
    }
    .trend-title{
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 10px;
    }
    .trend-rate{
      margin-left: 10px;
    }
    .trend-icon {
      font-size: 12px;

      &.up, &.down {
        margin-left: 20px;
        position: relative;
        top: 1px;

        i {
          font-size: 12px;
          transform: scale(.83);
        }
      }

      &.up {
        color: #52c41a;
      }
      &.down {
        color: #f5222d;
        top: -1px;
      }
    }
  }
</style>
