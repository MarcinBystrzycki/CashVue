<template>
  <v-container class="dashboard p-0" fluid grid-list-sm>
    <v-layout row wrap>
      <accounts-container />
      <active-account-balance-container />
      <active-account-info-container />
      <settlements-container />
      <notes-container />
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import AccountsContainer from '../components/AccountsContainer';
import ActiveAccountBalanceContainer from '../components/ActiveAccountBalanceContainer';
import NotesContainer from '../components/NotesContainer';
import SettlementsContainer from '../components/SettlementsContainer';
import ActiveAccountInfoContainer from '../components/ActiveAccountInfoContainer';


export default {
  components: {
    AccountsContainer,
    ActiveAccountBalanceContainer,
    NotesContainer,
    SettlementsContainer,
    ActiveAccountInfoContainer,
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
