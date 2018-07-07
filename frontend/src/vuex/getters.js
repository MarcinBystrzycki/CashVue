export default {
	getUser(state) {
		console.log(state)
		return state.user
	},
	getDrawer(state) {
		return state.drawer
	},
	getAccounts(state) {
		return state.accounts
	},
	getCurrencies(state) {
		return state.currencies
	},
	getAccountColors(state) {
		return state.accountColors
	},
	getActiveAccount(state) {
		return state.activeAccount
	}
};