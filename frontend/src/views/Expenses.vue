<template>
	<v-container class="p-0" fluid grid-list-sm>
		<v-layout row wrap>
			<expenses-info-container
				title="EXPENSES INFO"
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
	import ExpensesInfoContainer from '../components/ExpensesInfoContainer'
	import { mapGetters, mapActions } from 'vuex'

	export default {
		components: {
			EarningsExpensesTableContainer,
			ExpensesInfoContainer
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

<style>
	
</style>