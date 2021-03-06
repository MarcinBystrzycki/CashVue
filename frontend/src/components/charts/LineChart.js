import { Line } from 'vue-chartjs';
import { mapGetters, mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
  extends: Line,
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
      };
    },
  },
  methods: {
    getDataCollection() {
      const data = this.type === 'expense' ? this.expenses : this.earnings;
      const dataByDate = _.filter(data, item => (dayjs(item.time).isAfter(dayjs(this.dateRange.from))
                    || dayjs(item.time).isSame(dayjs(this.dateRange.from)))
                    && (dayjs(item.time).isBefore(dayjs(this.dateRange.to))
                    || dayjs(item.time).isSame(dayjs(this.dateRange.to))));
      const getMonthLabels = (dateRange) => {
        const diff = dayjs(dateRange.to).diff(dayjs(dateRange.from), 'months');
        const months = [];
        let i = 0;

        do {
          if (i > 0) {
            months.push(dayjs(dateRange.from).add(i, 'month'));
          } else {
            months.push(dayjs(dateRange.from));
          }

          i++;
        } while (i <= diff);

        return months;
      };
      const getMonthExpenses = (months, data) => _.map(months, (month) => {
        const totalMonthExpenses = _.chain(data)
          .filter(item => dayjs(item.time).month() === month.month())
          .map(item => item.amount)
          .reduce((a, b) => a + b)
          .value();

        if (_.isNumber(totalMonthExpenses)) {
          return totalMonthExpenses.toFixed(2);
        }
        return 0;
      });

      return {
        labels: _.map(getMonthLabels(this.dateRange), month => month.format('MMMM')),
        datasets: [{
          label: `All ${this.type}s`,
          data: getMonthExpenses(getMonthLabels(this.dateRange), dataByDate),
          backgroundColor: '#64B587',
          borderWidth: 4,
          pointBackgroundColor: 'black',
        },
        ],
      };
    },
  },
  watch: {
    expenses: {
      handler() {
        this.renderChart(this.getDataCollection());
      },
      deep: true,
    },
    earnings: {
      handler() {
        this.renderChart(this.getDataCollection());
      },
      deep: true,
    },
    dateRange: {
      handler() {
        this.renderChart(this.getDataCollection());
      },
      deep: true,
    },
  },
  mounted() {
    this.renderChart(this.getDataCollection());
  },
};
