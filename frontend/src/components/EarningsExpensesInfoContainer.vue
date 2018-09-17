<template>
  <v-flex md12 lg6 d-flex class="earnings-expenses__container">
    <v-card class="expenses-info__container">
      <v-card-title class="earnings-expenses__header">
        <h6 class="header-title">
          {{ title }}
        </h6>
        <v-spacer>
        </v-spacer>
        <span class="body-1">
          Start date:
        </span>
        <v-btn
          small
          color="primary"
          text-color="white"
          class="btn-control ml-3 mr-3"
          @click="dialog = true">
          {{ fromRange }}
        </v-btn>
        <span class="body-1">
          End date:
        </span>
        <v-btn
          small
          color="primary"
          text-color="white"
          class="btn-control ml-3 mr-3"
          @click="dialog = true">
          {{ toRange }}
        </v-btn>
        <v-dialog
          width="586"
          v-model="dialog">
          <v-card class="datepicker-range__card">
            <v-layout wrap>
              <v-flex
                class="datepicker-range__head"
                xs6>
                <span class="datepicker-range__head--title">
                  START DATE
                </span>
              </v-flex>
              <v-flex
                class="datepicker-range__head"
                xs6>
                <span class="datepicker-range__head--title">
                  END DATE
                </span>
              </v-flex>
              <v-flex xs12>
                <v-date-picker
                  class="datepicker-range__picker"
                  no-title
                  v-model="from">
                </v-date-picker>
                <v-date-picker
                  class="datepicker-range__picker"
                  no-title
                  v-model="to">
                </v-date-picker>
              </v-flex>
              <v-flex xs12>
                <v-spacer>
                </v-spacer>
                <v-btn @click="close()">
                  Cancel
                </v-btn>
                <v-btn @click="apply()">
                  Apply
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-media class="earnings-expenses__card-media">
        <v-layout justify-center>
          <earnings-expenses-charts
            :currency="currency"
            :type="type" />
        </v-layout>
      </v-card-media>
      <v-card-actions>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import dayjs from 'dayjs';
import { mapGetters, mapActions } from 'vuex';
import EarningsExpensesCharts from './EarningsExpensesCharts';

export default {
  props: ['title', 'items', 'type'],
  components: {
    EarningsExpensesCharts,
  },
  data() {
    return {
      from: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
      to: dayjs().format('YYYY-MM-DD'),
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      activeAccount: 'getActiveAccount',
      fromRange: 'getFromRange',
      toRange: 'getToRange',
    }),
    currency() {
      return this.activeAccount.defaultCurrency || '';
    },
  },
  methods: {
    ...mapActions({
      setDateRanges: 'setDateRanges',
    }),
    apply() {
      this.setDateRanges({
        fromRange: this.from,
        toRange: this.to,
      });
      this.close();
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>
