import Vue from 'vue'

Vue.filter('formatMoney', (value) => {
	if (value !== undefined) {
		return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')
	} else {
		return 0.00
	}

})