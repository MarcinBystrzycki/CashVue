<template>
	<v-flex class="dashboard__element" xs12 sm6 md4 d-flex>
		<v-card>
			<dashboard-element-header title="ACTUAL BALANCE" :subtitle="activeAccount.name" />
			<v-flex class="dashboard__active-account__content">
				<div>
					<h5 class="dashboard__active-account__title">
						<span :style="getAccountColor(activeAccount.color)">
							{{ activeAccount.actualBalance | formatMoney }}
						</span>
						{{ activeAccount.defaultCurrency }}
<!-- 						<v-dialog v-model="dialog" max-width="300">
							<v-btn slot="activator" flat icon>
								<v-icon size="21">
									edit
								</v-icon>
							</v-btn>
							<v-card>
								<v-container>
									<v-form>
										<h6 class="text-left">
											Change your account settings
										</h6>
										<v-text-field
											:value="color"
											v-model="actualBalance"
											label="Balance">
										</v-text-field>
										<v-select
											label="Currency"
											:value="currency"
											v-model="currency"
											:items="currencies">
										</v-select>
										<v-btn
											color="primary"
											@click="dialog = !dialog">
											Cancel
										</v-btn>
										<v-btn
											color="primary"
											@click="updateAccount">
											Save
										</v-btn>
									</v-form>
								</v-container>
							</v-card>
						</v-dialog> -->
					</h5>
					<p class="dashboard__active-account__subtitle">
						{{ '0%' }}
					</p>
					<p class="dashboard__active-account__subtitle">
						<small>
							of last month's balance
						</small>
					</p>
				</div>
			</v-flex>
		</v-card>
	</v-flex>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import DashboardElementHeader from './DashboardElementHeader'

	export default {
		components: {
			DashboardElementHeader
		},
		data() {
			return {
				dialog: false,
				actualBalance: 0,
				currency: '',
			}
		},
		computed: {
			...mapGetters({
				activeAccount: 'getActiveAccount',
				accountColors: 'getAccountColors',
				currencies: 'getCurrencies'
			}),
		},
		methods: {
			...mapActions({
				setActiveAccount: 'setActiveAccount',
				updateUserAccount: 'updateUserAccount'
			}),
			getAccountColor(color) {
				if (color) {
					const colorVal = this.accountColors[color]

					return `color: ${colorVal}`
				}
			},
			// updateAccount() {
			// 	this.updateUserAccount({
			// 		actualBalance: this.actualBalance,
			// 		currency: this.currency,
			// 		id: this.activeAccount.id
			// 	})
			// },
		},
		watch: {
			activeAccount: {
				handler() {
					this.actualBalance = this.activeAccount.actualBalance
					this.currency = this.activeAccount.defaultCurrency
				},
				deep: true
			}
		}
	}
</script>
