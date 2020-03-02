import { Bar } from 'vue-chartjs'
import resize from '@/utils/resize'

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
  extends: Bar,
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
    this.renderChart(barData, { responsive: true, maintainAspectRatio: false })
  }
}

