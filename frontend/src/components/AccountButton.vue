<template>
	<v-btn 
		class="btn__account"
		:outline="account.id !== activeAccount.id"
		:class="getButtonColor(account.color)"
		:accountID="account.id"
		@click="chooseActiveButton()">
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
		props: ['account', 'index'],
		computed: {
			...mapGetters({
				accountColors: 'getAccountColors',
				activeAccount: 'getActiveAccount'
			})
		},
		methods: {
			...mapActions({
				setActiveAccount: 'setActiveAccount',
				setActiveIndex: 'setActiveIndex',
			}),
			getButtonColor(color) {
				if (color) {
					const colorVal = this.accountColors[color]

					return {
						[color]: colorVal
					}
				}
			},
			chooseActiveButton() {
				this.setActiveIndex(this.index)
				this.setActiveAccount(this.account)
			}
		},
	}

</script>