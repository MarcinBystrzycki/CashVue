import { Doughnut } from 'vue-chartjs';
import { mapGetters, mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
  extends: Doughnut,
  props: ['type'],
  computed: {
    ...mapGetters({
      expenses: 'getActiveAccountExpenses',
      earnings: 'getActiveAccountEarnings',
      colors: 'getAccountColors',
      fromRange: 'getFromRange',
      toRange: 'getToRange',
    }),
    dateRange() {
      return {
        from: this.fromRange,
        to: this.toRange,
        options: { responsive: true, maintainAspectRatio: false },
      };
    },
  },
  methods: {
    getDataCollection() {
      const data = this.type === 'expense' ? this.expenses : this.earnings,
        dateFrom = dayjs(this.dateRange.from),
        dateTo = dayjs(this.dateRange.to),
        dataByDate = _.filter(data, (item) => {
          const itemDate = dayjs(item.time);
          return (itemDate.isAfter(dateFrom)
                        || itemDate.isSame(dateFrom))
                        && (itemDate.isBefore(dateTo)
                        || itemDate.isSame(dateTo));
        }),
        categories = _.uniq(_.map(dataByDate, 'category')),
        values = _.map(categories, (item) => {
          const amounts = _.filter(dataByDate, obj => obj.category === item);

          return _.sumBy(amounts, obj => obj.amount).toFixed(2);
        });

      return {
        labels: categories.length ? categories : ['no data'],
        datasets: [{
          label: this.type,
          backgroundColor: Object.values(this.colors).slice(0, categories.length),
          data: values.length ? values : [1],
        },
        ],
      };
    },
  },
  watch: {
    expenses: {
      handler() {
        this.renderChart(this.getDataCollection(), this.options);
      },
      deep: true,
    },
    earnings: {
      handler() {
        this.renderChart(this.getDataCollection(), this.options);
      },
      deep: true,
    },
    dateRange: {
      handler() {
        this.renderChart(this.getDataCollection(), this.options);
      },
      deep: true,
    },
  },
  mounted() {
    this.renderChart(this.getDataCollection(), this.options);
  },
};
