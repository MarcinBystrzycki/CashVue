export default {
  getAuthenticated(state) {
    return state.authenticated;
  },
  getUser(state) {
    return state.user;
  },
  getDrawer(state) {
    return state.drawer;
  },
  getAccounts(state) {
    return state.accounts;
  },
  getCurrencies(state) {
    return state.currencies;
  },
  getAccountColors(state) {
    return state.accountColors;
  },
  getActiveAccount(state) {
    return state.activeAccount;
  },
  getActiveIndex(state) {
    return state.activeIndex;
  },
  getActiveAccountExpenses(state) {
    return state.activeAccountExpenses;
  },
  getActiveAccountEarnings(state) {
    return state.activeAccountEarnings;
  },
  getNotes(state) {
    return state.notes;
  },
  getSelectedNote(state) {
    return state.selectedNote;
  },
  getTotals(state) {
    return state.totals;
  },
  getFromRange(state) {
    return state.fromRange;
  },
  getToRange(state) {
    return state.toRange;
  },
};
