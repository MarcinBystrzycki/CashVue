<template>
	<v-flex class="dashboard__element" xs12 sm6 md4 d-flex>
		<v-card>
			<dashboard-element-header title="ACCOUNTS">
				<add-account />
			</dashboard-element-header>
			<v-card-media>
				<p class="click-accounts-text">
					<small v-if="accountsInfo.length">
						Click button below to see your account
					</small>
					<small v-else>
						Click button above to add new account
					</small>
				</p>
			</v-card-media>
			<v-card-actions class="dashboard__accounts-container__content">
				<v-layout :justify-center="accountsInfo.length > 1 ? false : true" wrap>
					<template 
						v-if="accountsInfo.length"
						v-for="(account, index) in accountsInfo">
						<account-button
							:index="index"
							:account="account"
							:key="account.id"/>
					</template>
					<p class="no-accounts-text" v-if="!accountsInfo.length">
						<small>
							No accounts available
						</small>
					</p>
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
