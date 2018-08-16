<template>
	<v-flex class="dashboard__element" xs12 sm6 md4 d-flex>
		<v-card>
			<dashboard-element-header title="ACCOUNTS LIST"/>
			<v-card-media>
			</v-card-media>
			<v-card-actions>
				<v-layout wrap>
					<template v-for="(account, index) in accountsInfo">
						<account-button
							:index="index"
							:account="account"
							:key="account.id"/>
					</template>
					<add-account />
				</v-layout>
			</v-card-actions>
		</v-card>
	</v-flex>
</template>

<script>
	import AddAccount from './AddAccount'
	import AccountButton from './AccountButton'
	import DashboardElementHeader from './DashboardElementHeader'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			AddAccount,
			AccountButton,
			DashboardElementHeader
		},
		computed: {
			...mapGetters({
				accountsInfo: 'getAccounts',
			})
		},
	}
</script>

<style lang="sass" scoped>

</style>