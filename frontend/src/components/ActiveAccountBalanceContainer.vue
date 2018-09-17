<template>
  <v-flex class="dashboard__element" xs12 sm6 md4 d-flex>
    <v-card>
      <dashboard-element-header title="BALANCE"/>
      <v-card-media>
        <p class="click-accounts-text">
          <small>
            Current account balance
          </small>
        </p>
      </v-card-media>
      <v-flex class="dashboard__active-account__content">
        <v-icon class="arrow1">
          arrow_forward
        </v-icon>
        <v-icon class="arrow2">
          arrow_forward
        </v-icon>
        <v-icon class="arrow3">
          arrow_forward
        </v-icon>
        <v-icon class="arrow4">
          arrow_forward
        </v-icon>
        <div>
          <h6 class="dashboard__active-account__title header-title">
            <span
              v-if="activeAccount.actualBalance"
              :style="getAccountColor(activeAccount.color)">
              {{ activeAccount.actualBalance | formatMoney }}
            </span>
            <span v-if="activeAccount.defaultCurrency">
              {{ activeAccount.defaultCurrency }}
            </span>
            <span v-else>
              no data
            </span>
          </h6>
          <p class="dashboard__active-account__subtitle">
            {{ `~ ${balanceRatio}` }}
          </p>
          <p class="dashboard__active-account__subtitle">
            <small>
              of initial balance
            </small>
          </p>
        </div>
      </v-flex>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DashboardElementHeader from './DashboardElementHeader';

export default {
  components: {
    DashboardElementHeader,
  },
  data() {
    return {
      dialog: false,
      actualBalance: 0,
      currency: '',
    };
  },
  computed: {
    ...mapGetters({
      activeAccount: 'getActiveAccount',
      accountColors: 'getAccountColors',
      currencies: 'getCurrencies',
    }),
    balanceRatio() {
      if (this.activeAccount.actualBalance && this.activeAccount.initialBalance) {
        const ratio = (this.activeAccount.actualBalance / this.activeAccount.initialBalance * 100)
          .toFixed(0);

        return `${ratio}%`;
      }

      return '0%';
    },
  },
  methods: {
    ...mapActions({
      setActiveAccount: 'setActiveAccount',
      updateUserAccount: 'updateUserAccount',
    }),
    getAccountColor(color) {
      let colorVal;

      if (color) {
        colorVal = this.accountColors[color];
      }

      return `color: ${colorVal}`;
    },
  },
  watch: {
    activeAccount: {
      handler() {
        this.actualBalance = this.activeAccount.actualBalance;
        this.currency = this.activeAccount.defaultCurrency;
      },
      deep: true,
    },
  },
};
</script>
