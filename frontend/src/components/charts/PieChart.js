import { Doughnut } from 'vue-chartjs'
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'

export default {
  extends: Doughnut,
  props: ['type', 'dateRange'],
  computed: {
    ...mapGetters({
      expenses: 'getActiveAccountExpenses',
      earnings: 'getActiveAccountEarnings',
      colors: 'getAccountColors',
    }),
  },
  methods: {
    getDataCollection() {
      const data = this.type === 'expense' ? this.expenses : this.earnings
      const dataByDate = _.filter(data, (item) => {
        return (dayjs(item.time).isAfter(dayjs(this.dateRange.from)) || 
          dayjs(item.time).isSame(dayjs(this.dateRange.from))) && 
          (dayjs(item.time).isBefore(dayjs(this.dateRange.to)) || 
          dayjs(item.time).isSame(dayjs(this.dateRange.to)))
      })
      const categories = _.uniq(_.map(dataByDate, 'category'))
      const values = _.map(categories, (item) => {
        const amounts = _.filter(dataByDate, (obj) => obj.category === item)
        
        return _.sumBy(amounts, (obj) => obj.amount).toFixed(2)
      })

      return {
        labels: categories.length ? categories : ['no data'],
        datasets: [{
            label: this.type,
            backgroundColor: Object.values(this.colors).slice(0, categories.length),
            data: values.length ? values : [1],
          }
        ]
      }
    },
  },
  watch: {
    expenses: {
      handler: function() {
        this.renderChart(this.getDataCollection())
      },
      deep: true,
    },
    earnings: {
      handler: function() {
        this.renderChart(this.getDataCollection())
      },
      deep: true,
    },
    dateRange: {
      handler: function() {
        this.renderChart(this.getDataCollection())
      },
      deep: true,
    }
  },
  mounted() {
    this.renderChart(this.getDataCollection())
  },
}
