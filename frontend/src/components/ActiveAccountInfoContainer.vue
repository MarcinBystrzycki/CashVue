<template>
  <v-flex class="dashboard__element" xs12 sm6 md4 d-flex>
    <v-card>
      <dashboard-element-header title="INFO & ACTIONS">
        <div>
          <edit-account />
          <remove-account />
        </div>
      </dashboard-element-header>
      <v-card-media>
        <p class="click-accounts-text">
          <small>
            Current account information
          </small>
        </p>
      </v-card-media>
      <active-account-info-table />
    </v-card>
  </v-flex>
</template>

<script>
import DashboardElementHeader from './DashboardElementHeader';
import ActiveAccountInfoTable from './ActiveAccountInfoTable';
import EditAccount from './EditAccount';
import RemoveAccount from './RemoveAccount';

export default {
  components: {
    DashboardElementHeader,
    ActiveAccountInfoTable,
    EditAccount,
    RemoveAccount,
  },
};
</script>
