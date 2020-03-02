import { Doughnut } from 'vue-chartjs'
import resize from '@/utils/resize'

export default {
  extends: Doughnut,
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: null
    }

  },
  mounted() {
    this.renderChart(this.data, { responsive: true, maintainAspectRatio: false })
  }
}

