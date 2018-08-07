<template>
  <v-flex md12 lg6 d-flex>
    <v-card class="earnings-expenses-table__container">
      <v-card-title class="earnings-expenses__header">
        <h6>
          {{ title }}
        </h6>
        <v-spacer>
        </v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px">
          <v-btn
            color="primary"
            slot="activator">
            {{ 'add ' + type }}
          </v-btn>
          <v-form ref="addEarningExpenseForm" v-model="valid" lazy-validation>
            <v-card>
              <v-card-title>
                <h6>
                  {{ formTitle }}
                </h6>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs-12 sm6 md4>
                      <v-text-field
                        required
                        label="Name"
                        :rules="nameRule"
                        v-model="editedItem.name">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs-12 sm6 md4>
                      <v-select
                        required
                        label="Category"
                        :rules="categoryRule"
                        :items="categories"
                        v-model="editedItem.category">
                      </v-select>
                    </v-flex>
                    <v-flex xs-12 sm6 md4>
                      <v-text-field
                        required
                        label="Amount"
                        :rules="amountRule"
                        v-model="editedItem.amount">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs-12 sm6 md4>
                      <v-menu
                        :close-on-content-click="false"
                        v-model="datepicker"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="editedItem.time"
                          label="Date"
                          persistent-hint
                          readonly
                        ></v-text-field>
                        <v-date-picker
                          v-model="editedItem.time"
                          @input="datepicker = false"
                          no-title>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs-12 sm6 md4>
                      <v-text-field
                        label="Place"
                        v-model="editedItem.place">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click.native="closeDialog">Cancel</v-btn>
                <v-btn
                  color="primary"
                  :disabled="!valid"
                  @click.native="saveItem">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        class="earnings-expenses-table"
        hide-actions
        :pagination.sync="pagination"
        :headers="headers"
        :items="items"
        :customFilter="filterItems"
        :search="search">
        <template slot="items" slot-scope="props">
          <td class="earnings-expenses-table__cell">{{ props.item.name | valueCheck }}</td>
          <td class="earnings-expenses-table__cell">{{ props.item.category | valueCheck }}</td>
          <td class="earnings-expenses-table__cell">{{ props.item.amount | formatMoney }}</td>
          <td class="earnings-expenses-table__cell">{{ props.item.time | valueCheck }}</td>
          <td class="earnings-expenses-table__cell">{{ props.item.place | valueCheck }}</td>
          <td class="earnings-expenses-table__cell">
            <v-icon
              small
              class="m-1 action-icons"
              @click="editItem(props.item)">
              edit
            </v-icon>
            <v-icon
              small
              class="m-1 action-icons"
              @click="deleteItem(props.item)">
              delete
            </v-icon>
          </td>
        </template>
        <template slot="footer">
          <td colspan="100%" class="earnings-expenses-table__cell total-amount"> Total amount: {{ totalAmount }}</td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2 earnings-expenses__pagination">
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import dayjs from 'dayjs'

  export default {
    props: ['title', 'items', 'type'],
    data() {
      return {
        valid: true,
        search: '',
        totalAmount: 0,
        dialog: false,
        datepicker: false,
        editedID: '',
        pagination: {
          rowsPerPage: 11,
        },
        editedItem: {
          name: '',
          category: '',
          amount: '',
          time: dayjs().format('YYYY-MM-DD'),
          place: '',
        },
        defaultItem: {
          name: '',
          category: '',
          amount: '',
          time: dayjs().format('YYYY-MM-DD'),
          place: '',
        },
        categories: ['Food, drinks', 'Shopping', 'Housing', 'Transport', 'Car', 'Entertainment', 'Communication', 'Electronics', 'Finance', 'Investments', 'Income', 'Other'],
        nameRule: [v => !!v || 'Name is required'],
        categoryRule: [v => !!v || 'Category is required'],
        amountRule: [v => !!v || 'Amount is required'],
      }
    },
    methods: {
      ...mapActions({
        addExpenseOrEarning: 'addExpenseOrEarning',
        updateExpenseOrEarning: 'updateExpenseOrEarning',
        deleteExpenseOrEarning: 'deleteExpenseOrEarning',
      }),
      filtered(items, search, filter) {
        search = search.toString().toLowerCase()

        return items.filter(item => {
          const keys = Object.keys(item).filter(key => key !== 'id' && key !== 'accountID' && key !== 'additional_notes')

          return keys.some(key => {
            const value = item[key].toString().toLowerCase()

            return value.includes(search)
          })
        })
      },
      filterItems(items, search, filter) {
        this.totalAmount = `${this.filtered(items, search, filter).reduce((previous, current) => parseFloat(previous) + parseFloat(current.amount), 0).toFixed(2)} ${this.activeAccount.defaultCurrency}`

        return this.filtered(items, search, filter)
      },
      editItem(item) {
        this.editedID = item.id
        this.editedItem = Object.assign({}, {...item, accountID: this.activeAccount.id})
        this.dialog = true
      },
      deleteItem(item) {
        this.deleteExpenseOrEarning(item.id)
      },
      saveItem(event, item) {
        const itemData = {
          ...this.editedItem,
          accountID: this.activeAccount.id,
          type: this.type
        }

        if (this.$refs.addEarningExpenseForm.validate()) {
          if (this.editedID.length) {
            this.updateExpenseOrEarning(itemData)
            this.closeDialog()
          } else {
            this.addExpenseOrEarning(itemData)
            this.closeDialog()
          }
        }
      },
      closeDialog() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedID = ''
        }, 300)
      }
    },
    computed: {
      ...mapGetters({
        activeAccount: 'getActiveAccount',
      }),
      formTitle() {
        return this.editedID.length ? 'Edit item' : 'New item'
      },
      headers() {
        return [
          {
            text: 'Name',
            align: 'center',
            sortable: true,
            value: 'name',
          },
          {
            text: 'Category',
            align: 'center',
            sortable: true,
            value: 'category',
          },
          {
            text: `Amount (${this.activeAccount.defaultCurrency})`,
            align: 'center',
            sortable: true,
            value: 'amount',
          },
          {
            text: 'Date',
            align: 'center',
            sortable: true,
            value: 'time',
          },
          {
            text: 'Place',
            align: 'center',
            sortable: true,
            value: 'place',
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false
          }
        ]
      },
      pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    watch: {
      dialog(val) {
        val || this.closeDialog()
      },
    },
  }
</script>

<style lang="sass" scoped>
  .total-amount
    text-align: right
    font-weight: 700
  .action-icons
    cursor: pointer
</style>