import * as types from './mutation_types'
import { http, apiUrl } from '../utils/http'

export default {
  setAuthenticated({ commit }, data) {
    commit(types.SET_AUTHENTICATED, data)
  },
	setUser({ commit }, data) {
		commit(types.SET_USERNAME, data.name)
		commit(types.SET_LASTNAME, data.lastname)
		commit(types.SET_NICKNAME, data.nickname)
		commit(types.SET_EMAIL, data.email)
		commit(types.SET_GENDER, data.gender)
		commit(types.SET_BIRTHDATE, data.birthDate)
	},
  setActiveAccount({ commit }, data) {
    commit(types.SET_ACTIVE_ACCOUNT, data)
  },
  setActiveIndex({ commit }, data) {
    commit(types.SET_ACTIVE_INDEX, data)
  },
  setUserAccounts({ commit }, data) {
    commit(types.SET_ACCOUNTS, data)
  },
  setActiveAccountEarnings({ commit }, data) {
    commit(types.SET_ACTIVE_ACCOUNT_EARNINGS, data)
  },
  setActiveAccountExpenses({ commit }, data) {
    commit(types.SET_ACTIVE_ACCOUNT_EXPENSES, data)
  },
  toggleDrawer({ commit }) {
    commit(types.TOGGLE_DRAWER)
  },
  saveNewAccount({ commit, dispatch }, data) {
    http.post(apiUrl('post', ['accounts', 'add']), data)
      .then((res) => {
        console.log(res)
        dispatch('getUserAccounts')
      })
      .catch((err) => console.error(err))
  },
  saveProfile({ commit }, data) {
    http.post(apiUrl('post', ['user']), data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.error(err))
  },
  getUserProfile({ commit, dispatch }) {
    http.get(apiUrl('get', ['users', localStorage.id_token]))
      .then((res) => {
        this.dispatch('setUser', res.data[0])
      })
      .catch((err) => console.error(err))
  },
  getUserAccounts({ commit, dispatch, state }) {
    http.get(apiUrl('get', ['accounts', localStorage.id_token]))
      .then((res) => {
        dispatch('setUserAccounts', res.data)
        dispatch('setActiveAccount', res.data[state['activeIndex']])
      })
      .catch((err) => console.error(err))
  },
  updateUserAccount({ commit, dispatch }, data) {
    http.post(apiUrl('post', ['accounts', 'update']), data)
      .then((res) => {
        dispatch('getUserAccounts')
      })
      .catch((err) => console.error(err))
  },
  getActiveAccountEarningsAndExpenses({ commit, dispatch }) {

  },
}