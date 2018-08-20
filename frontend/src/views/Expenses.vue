<template>
	<v-container class="p-0" fluid grid-list-sm>
		<v-layout row wrap>
			<earnings-expenses-info-container
				title="EXPENSES INFO"
				type="expense"
				:items="expenses" />
			<earnings-expenses-table-container 
				title="EXPENSES LIST"
				type="expense"
				:items="expenses" />
		</v-layout>
	</v-container>
</template>

<script>
import EarningsExpensesTableContainer from '../components/EarningsExpensesTableContainer'
import EarningsExpensesInfoContainer from '../components/EarningsExpensesInfoContainer'
import { mapGetters, mapActions } from 'vuex'

export default {
	components: {
		EarningsExpensesTableContainer,
		EarningsExpensesInfoContainer
	},
	computed: {
		...mapGetters({
			expenses: 'getActiveAccountExpenses',
		}),
	},
	methods: {
		...mapActions({
			getUserAccounts: 'getUserAccounts',
		}),
	},
	created() {
		this.getUserAccounts()
	},
}
</script>
