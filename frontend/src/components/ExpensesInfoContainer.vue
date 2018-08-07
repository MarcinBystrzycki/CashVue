<template>
  <v-flex md12 lg6 d-flex>
    <v-card class="expenses-info__container">
      <v-card-title class="earnings-expenses__header">
        <h6>
          {{ title }}
        </h6>
        <v-spacer>
        </v-spacer>
        <span>
          Start date:
        </span>
        <v-btn
          color="primary"
          text-color="white"
          class="ml-3 mr-3"
          @click="dialog = true">
          {{ fromRange }}
        </v-btn>
        <span>
          End date:
        </span>
        <v-btn
          color="primary"
          text-color="white"
          class="ml-3 mr-3"
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
      <v-card-media>
        <v-layout justify-center>
          <earnings-expenses-charts
            :currency="currency"
            :dateRange="dateRange"
            type="expense" />
        </v-layout>
      </v-card-media>
    </v-card>
  </v-flex>
</template>

<script>
  import dayjs from 'dayjs'
  import EarningsExpensesCharts from './EarningsExpensesCharts'
  import { mapGetters } from 'vuex'

  export default {
    props: ['title', 'items'],
    components: {
      EarningsExpensesCharts
    },
    data() {
      return {
        fromRange: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        toRange: dayjs().format('YYYY-MM-DD'),
        from: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        to: dayjs().format('YYYY-MM-DD'),
        dialog: false,
      }
    },
    computed: {
      ...mapGetters({
        activeAccount: 'getActiveAccount',
      }),
      currency() {
        return this.activeAccount.defaultCurrency
      },
      dateRange() {
        return {
          from: this.fromRange,
          to: this.toRange
        }
      },
    },
    methods: {
      apply() {
        this.fromRange = this.from
        this.toRange = this.to
        this.close()
      },
      close() {
        this.dialog = false
      }
    },
  } 
</script>
