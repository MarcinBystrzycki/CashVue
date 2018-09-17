import { Pie } from 'vue-chartjs';
import { mapGetters, mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
  extends: Pie,
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 20,
            right: 20,
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      expenses: 'getActiveAccountExpenses',
      earnings: 'getActiveAccountEarnings',
    }),
  },
  methods: {
    getDataCollection() {
      const expensesTotalAmount = _.sum(_.map(this.expenses, expense => expense.amount)).toFixed(2);
      const earningsTotalAmount = _.sum(_.map(this.earnings, earnings => earnings.amount)).toFixed(2);

      let labels = ['Earnings', 'Expenses'];
      let backgroundColor = ['#28a745', '#dc3545'];
      let data = [earningsTotalAmount, expensesTotalAmount];


      if (!parseFloat(earningsTotalAmount) && !parseFloat(expensesTotalAmount)) {
        labels = ['no data'];
        backgroundColor = ['#E5E5E5'];
        data = [1];
      }

      return {
        labels,
        datasets: [{
          backgroundColor,
          data,
        }],
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
  },
};
