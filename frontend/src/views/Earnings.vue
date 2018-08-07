<template>
	<v-container class="p-0" fluid grid-list-sm>
		<v-layout row wrap>
			<earnings-expenses-table-container 
				title="EARNINGS LIST"
				type="earning"
				:items="earnings" />
		</v-layout>
	</v-container>
</template>

<script>
	import EarningsExpensesTableContainer from '../components/EarningsExpensesTableContainer'
	import { mapGetters, mapActions } from 'vuex'

	export default {
		components: {
			EarningsExpensesTableContainer
		},
		computed: {
			...mapGetters({
				earnings: 'getActiveAccountEarnings',
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