import * as types from './mutation_types';

export default {
  [types.SET_AUTHENTICATED](state, value) {
    state.authenticated = value;
  },
  [types.SET_USERNAME](state, value) {
    state.user.name = value;
  },
  [types.SET_LASTNAME](state, value) {
    state.user.lastname = value;
  },
  [types.SET_NICKNAME](state, value) {
    state.user.nickname = value;
  },
  [types.SET_EMAIL](state, value) {
    state.user.email = value;
  },
  [types.SET_GENDER](state, value) {
    state.user.gender = value;
  },
  [types.SET_BIRTHDATE](state, value) {
    state.user.birthDate = value;
  },
  [types.TOGGLE_DRAWER](state) {
    state.drawer = !state.drawer;
  },
  [types.ADD_ACCOUNT](state, newAccount) {
    state.accounts = [...state.accounts, newAccount];
  },
  [types.SET_ACCOUNTS](state, data) {
    state.accounts = data.accounts;
  },
  [types.DELETE_ACCOUNT](state, accountID) {
    state.accounts = state.accounts.filter(account => account.id !== accountID);
  },
  [types.SET_ACTIVE_ACCOUNT](state, account) {
    state.activeAccount = account;
  },
  [types.SET_ACTIVE_INDEX](state, value) {
    state.activeIndex = value;
  },
  [types.SET_ACTIVE_ACCOUNT_EARNINGS](state, value) {
    state.activeAccountEarnings = value;
  },
  [types.SET_ACTIVE_ACCOUNT_EXPENSES](state, value) {
    state.activeAccountExpenses = value;
  },
  [types.SET_NOTES](state, value) {
    state.notes = value;
  },
  [types.SET_SELECTED_NOTE](state, value) {
    state.selectedNote = value;
  },
  [types.SET_DATE_RANGES](state, data) {
    state.fromRange = data.fromRange;
    state.toRange = data.toRange;
  },
};
