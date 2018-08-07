<template>
	<v-btn 
		class="btn__account"
		:class="getButtonColor(account.color)"
		@click="chooseActiveButton()">
		<div class="btn__account--account_name">
			{{ account.name }}
		</div>
		<v-icon class="icon__toggle" size="17" v-if="account.id == activeAccount.id">
			fas fa-toggle-on
		</v-icon>
		<v-icon class="icon__toggle" size="17" v-else>
			fas fa-toggle-off
		</v-icon>
		<div class="btn__account--balance">
			{{ account.actualBalance | formatMoney }}
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
			},
		},
	}

</script>
