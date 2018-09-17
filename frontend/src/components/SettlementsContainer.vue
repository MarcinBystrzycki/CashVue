<template>
  <v-flex class="dashboard__element" xs12 sm6 md4 d-flex>
    <v-card>
      <dashboard-element-header title="SETTLEMENTS"/>
      <v-card-media>
        <p class="click-accounts-text">
          <small>
            See total earnings and expenses below
          </small>
        </p>
      </v-card-media>
      <pie-chart
        class="pie-chart"
        :width="240"
        :height="240">
      </pie-chart>
    </v-card>
  </v-flex>
</template>

<script>
import DashboardElementHeader from './DashboardElementHeader';
import PieChart from './charts/PieChart';

export default {
  components: {
    DashboardElementHeader,
    PieChart,
  },
};
</script>
