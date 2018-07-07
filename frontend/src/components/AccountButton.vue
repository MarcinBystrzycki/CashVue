<template>
	<v-btn 
		class="btn__account"
		:outline="account.id !== activeAccount.id"
		:class="getButtonColor(account.color)"
		:accountID="account.id"
		@click="setActiveAccount(account)">
		<div class="btn__account--account_name">
			{{ account.name }}
		</div>
		<div class="btn__account--balance">
			{{ account.balance | formatMoney }}
			{{ account.defaultCurrency }}
		</div>
	</v-btn>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		props: ['account'],
		computed: {
			...mapGetters({
				accountColors: 'getAccountColors',
				activeAccount: 'getActiveAccount'
			})
		},
		methods: {
			...mapActions({
				setActiveAccount: 'setActiveAccount',
			}),
			getButtonColor(color) {
				if (color) {
					const colorVal = this.accountColors[color]

					return {
						[color]: colorVal
					}
				}
			},
		},
	}

</script>