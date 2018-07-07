<template>
	<v-container fluid grid-list-sm>
			<v-layout row wrap>
				<accounts-container />
				<active-account-container />
				<expenses-container />
				<earnings-container />
			</v-layout>
	</v-container>
</template>

<script>
	import AccountsContainer from '../components/AccountsContainer'
	import ActiveAccountContainer from '../components/ActiveAccountContainer'
	import ExpensesContainer from '../components/ExpensesContainer'
	import EarningsContainer from '../components/EarningsContainer'
	import { mapActions } from 'vuex'

	export default {
		components: {
			AccountsContainer,
			ActiveAccountContainer,
			ExpensesContainer,
			EarningsContainer
		},
		methods: {
			...mapActions({
				getUserAccounts: 'getUserAccounts'
			})
		},
		created() {
			this.getUserAccounts()
		},
	}
</script>

<style>
	
</style>