<template>
  <v-container class="p-0" fluid grid-list-sm>
    <v-layout row wrap>
      <earnings-expenses-info-container
        title="EARNINGS INFO"
        type="earning"
        :items="earnings" />
      <earnings-expenses-table-container
        title="EARNINGS LIST"
        type="earning"
        :items="earnings" />
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EarningsExpensesTableContainer from '../components/EarningsExpensesTableContainer';
import EarningsExpensesInfoContainer from '../components/EarningsExpensesInfoContainer';

export default {
  components: {
    EarningsExpensesTableContainer,
    EarningsExpensesInfoContainer,
  },
  computed: {
    ...mapGetters({
      earnings: 'getActiveAccountEarnings',
    }),
  },
  methods: {
    ...mapActions({
      getUserAccounts: 'getUserAccounts',
    }),
  },
  created() {
    this.getUserAccounts();
  },
};
</script>
