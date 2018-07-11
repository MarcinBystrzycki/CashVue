export default {
	authenticated: false,
	user: {
		name: '',
		lastname: '',
		nickname: '',
		email: '',
		gender: '',
		birthDate: ''
	},
	drawer: true,
	accountColors: {
		blue: "#007bff",
		indigo: "#6610f2",
		purple: "#6f42c1",
		pink: "#e83e8c",
		red: "#dc3545",
		orange: "#fd7e14",
		yellow: "#ffc107",
		green: "#28a745",
		teal: "#20c997",
		cyan: "#17a2b8",
		white: "#fff",
		gray: "#6c757d",
		grayDark: "#343a40",
		primary: "#007bff",
		secondary: "#6c757d",
		success: "#28a745",
		info: "#17a2b8",
		warning: "#ffc107",
	},
	currencies: ['PLN', 'USD', 'EUR', 'GBP', 'CAD', 'RUB', 'AUD', 'CNY', 'JPY', 'CHF'],
	accounts: [
		{
			id: 1,
			name: 'PKO gotówkowe',
			balance: 2000,
			defaultCurrency: 'PLN',
			color: 'red'
		},
		{
			id: 2,
			name: 'PKO oszczędnościowe',
			balance: 1000,
			defaultCurrency: 'PLN',
			color: 'blue'
		}
	],
	activeAccount: {},
	activeAccountEarnings: {},
	activeAccountExpenses: {},
	activeIndex: 0,
};