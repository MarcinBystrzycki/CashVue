import * as types from './mutation_types';
import { http, apiUrl } from '../utils/http';

export default {
  setAuthenticated({ commit }, data) {
    commit(types.SET_AUTHENTICATED, data);
  },
  setUser({ commit }, data) {
    commit(types.SET_USERNAME, data.name);
    commit(types.SET_LASTNAME, data.lastname);
    commit(types.SET_NICKNAME, data.nickname);
    commit(types.SET_GENDER, data.gender);
    commit(types.SET_BIRTHDATE, data.birthDate);
  },
  setActiveAccount({ commit, dispatch }, data) {
    commit(types.SET_ACTIVE_ACCOUNT, data);
    if (data.id) {
      dispatch('getActiveAccountEarningsAndExpenses', data.id);
    }
  },
  setActiveIndex({ commit }, data) {
    commit(types.SET_ACTIVE_INDEX, data);
  },
  setUserAccounts({ commit }, data) {
    commit(types.SET_ACCOUNTS, data);
  },
  setActiveAccountEarnings({ commit }, data) {
    commit(types.SET_ACTIVE_ACCOUNT_EARNINGS, data);
  },
  setActiveAccountExpenses({ commit }, data) {
    commit(types.SET_ACTIVE_ACCOUNT_EXPENSES, data);
  },
  setNotes({ commit }, data) {
    commit(types.SET_NOTES, data);
  },
  setSelectedNote({ commit }, data) {
    commit(types.SET_SELECTED_NOTE, data);
  },
  setDateRanges({ commit }, data) {
    commit(types.SET_DATE_RANGES, data);
  },
  addNote({ commit, dispatch }, data) {
    http.post(apiUrl('post', ['notes', 'add']), data)
      .then((res) => {
        dispatch('getNotes');
      })
      .catch(err => console.error(err));
  },
  editNote({ commit, dispatch }, data) {
    http.post(apiUrl('post', ['notes', 'update']), data)
      .then((res) => {
        dispatch('getNotes');
      })
      .catch(err => console.error(err));
  },
  deleteNote({ commit, dispatch }, data) {
    http.delete(apiUrl('delete', ['notes', data.id]))
      .then((res) => {
        dispatch('getNotes');
      })
      .catch(err => console.error(err));
  },
  getNotes({ commit, dispatch }) {
    http.get(apiUrl('get', ['notes', localStorage.id_token]))
      .then((res) => {
        dispatch('setNotes', res.data);
      })
      .catch(err => console.error(err));
  },
  toggleDrawer({ commit }) {
    commit(types.TOGGLE_DRAWER);
  },
  saveNewAccount({ commit, dispatch }, data) {
    http.post(apiUrl('post', ['accounts', 'add']), data)
      .then((res) => {
        dispatch('getUserAccounts');
      })
      .catch(err => console.error(err));
  },
  saveProfile({ commit }, data) {
    http.post(apiUrl('post', ['user']), data)
      .then((res) => {
        console.log(res);
      })
      .catch(err => console.error(err));
  },
  getUserProfile({ commit, dispatch }) {
    http.get(apiUrl('get', ['users', localStorage.id_token]))
      .then((res) => {
        dispatch('setUser', res.data[0]);
      })
      .catch(err => console.error(err));
  },
  getUserAccounts({ commit, dispatch, state }) {
    http.get(apiUrl('get', ['accounts', localStorage.id_token]))
      .then((res) => {
        if (res.data.accounts.length) {
          dispatch('setUserAccounts', res.data);
          dispatch('setNotes', res.data.notes);
          dispatch('setActiveAccount', res.data.accounts[state.activeIndex]);
        }
      })
      .catch(err => console.error(err));
  },
  updateUserAccount({ commit, dispatch }, data) {
    http.post(apiUrl('post', ['accounts', 'update']), data)
      .then((res) => {
        dispatch('getUserAccounts');
      })
      .catch(err => console.error(err));
  },
  getActiveAccountEarningsAndExpenses({ commit, dispatch }, data) {
    http.get(apiUrl('get', ['accounts', 'info', data]))
      .then((res) => {
        const expenses = res.data.filter(item => item.type === 'expense');
        const earnings = res.data.filter(item => item.type === 'earning');

        dispatch('setActiveAccountExpenses', expenses);
        dispatch('setActiveAccountEarnings', earnings);
      })
      .catch(err => console.error(err));
  },
  addExpenseOrEarning({ commit, dispatch, state }, data) {
    if (state.activeAccount.id !== undefined) {
      http.post(apiUrl('post', ['settlements', 'add']), data)
        .then((res) => {
          dispatch('getUserAccounts');
        })
        .catch(err => console.error(err));
    }
  },
  updateExpenseOrEarning({ commit, dispatch, state }, data) {
    if (state.activeAccount.id !== undefined) {
      http.post(apiUrl('post', ['settlements', 'update']), data.itemData)
        .then((res) => {
          dispatch('getUserAccounts');
          dispatch('getActiveAccountEarningsAndExpenses', data.id);
        })
        .catch(err => console.error(err));
    }
  },
  deleteUserAccount({ commit, dispatch, state }, data) {
    http.delete(apiUrl('delete', ['accounts', data.id]))
      .then((res) => {
        if (state.accounts.length <= 1) {
          dispatch('resetState');
        } else {
          if (state.activeIndex > 0) {
            dispatch('setActiveIndex', state.activeIndex - 1);
          } else {
            dispatch('setActiveIndex', 0);
          }
          dispatch('getUserAccounts');
        }
      })
      .catch(err => console.log(err));
  },
  deleteExpenseOrEarning({ commit, dispatch }, data) {
    http.delete(apiUrl('delete', ['settlements', data]))
      .then((res) => {
        dispatch('getUserAccounts');
      })
      .catch(err => console.error(err));
  },
  resetState({ commit, dispatch }) {
    dispatch('setUserAccounts', { accounts: [] });
    dispatch('setActiveIndex', 0);
    dispatch('setActiveAccount', {});
    dispatch('setActiveAccountExpenses', []);
    dispatch('setActiveAccountEarnings', []);
  },
};
