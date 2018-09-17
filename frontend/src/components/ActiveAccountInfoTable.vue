<template>
  <v-layout class="dashboard__active-account__info-table" align-center row wrap>
    <template v-for="(item, index) in accountInfo">
      <v-flex
        :key="index + 'A'"
        xs6
        class="active-account__info-row left-column">
        <v-chip
          disabled
          color="primary">
          <v-avatar class="white">
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-avatar>
          <span class="chip-name">
            {{ item.name }}
          </span>
        </v-chip>
      </v-flex>
      <v-flex
        :key="index + 'B'"
        xs6
        class="active-account__info-row right-column">
        <v-chip
          disabled
          class="chip-content"
          :class="activeAccount.color">
          {{ item.content }}
        </v-chip>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import * as _ from 'lodash';

export default {
  props: ['type'],
  computed: {
    ...mapGetters({
      activeAccount: 'getActiveAccount',
    }),
    accountInfo() {
      const formatMoney = balance => parseFloat(balance).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');

      return [
        {
          name: 'Account name',
          content: _.isString(this.activeAccount.name) ? this.activeAccount.name : 'no data',
          icon: 'account_balance',
        },
        {
          name: 'Current balance',
          content: _.isNumber(this.activeAccount.actualBalance) ? formatMoney(this.activeAccount.actualBalance) : 'no data',
          icon: 'account_balance_wallet',
        },
        {
          name: 'Currency',
          content: _.isString(this.activeAccount.defaultCurrency) ? this.activeAccount.defaultCurrency : 'no data',
          icon: 'attach_money',
        },
      ];
    },
  },
};
</script>
