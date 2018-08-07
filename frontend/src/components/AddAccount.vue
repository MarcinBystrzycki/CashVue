<template>
	<v-dialog 
		max-width="500" 
		class="modal__add-account"
		v-model="modal">
		<v-btn
			class="btn__add-account black"
			slot="activator">
			Add account
			<v-icon class="pl-1" size="24">
				add_circle_outline
			</v-icon>
		</v-btn>
		<v-form ref="addAccountForm" v-model="valid" lazy-validation>
			<v-card>
				<v-card-title>
					<h6>
						ADD YOUR NEW ACCOUNT
					</h6>
				</v-card-title>
				<v-card-text>
					<v-text-field
						v-model="name"
						label="Account name"
						:rules="[v => !!v || 'Name is required']"
						required>
					</v-text-field>
					<v-text-field
						v-model="initialBalance"
						:rules="[v => !!v || 'Starting balance is required']"
						type="number"
						label="Starting balance"
						required>
					</v-text-field>
					<v-select
						:items="currencies"
						:rules="[v => !!v || 'Currency is required']"
						v-model="defaultCurrency"
						label="Currency"
						required>
					</v-select>
					<v-select
						:rules="[v => !!v || 'Color is required']"
						:class="getInputColor()"
						:items="colorNames"
						item-avatar
						v-model="color"
						label="Color"
						required>
					</v-select>
				</v-card-text>
				<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							@click="toggleModal">
							Cancel
						</v-btn>
						<v-btn
							color="primary"
							:disabled="!valid"
							@click="addNewAccount">
							Save
						</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		name: 'AddAccount',
		data() {
			return {
				valid: true,
				modal: false,
				name: '',
				initialBalance: 0.00,
				defaultCurrency: '',
				color: ''
			}
		},
		computed: {
			...mapGetters({
				currencies: 'getCurrencies',
				accountColors: 'getAccountColors',
			}),
			colorNames() {
				return Object.keys(this.accountColors)
			},
		},
		methods: {
			...mapActions({
				saveNewAccount: 'saveNewAccount',
				getUserAccounts: 'getUserAccounts'
			}),
			toggleModal() {
				this.modal = !this.modal
			},
			getInputColor() {
				if (this.color) {
					const colorKey = this.color
					const colorVal = this.accountColors[this.color]

					return {
						'account-color': colorVal,
						[colorKey]: colorVal
					}
				}
			},
			addNewAccount() {
				if (this.$refs.addAccountForm.validate()) {
					this.saveNewAccount({
						tokenID: localStorage.id_token,
						account: {
							name: this.name,
							initialBalance: this.initialBalance,
							defaultCurrency: this.defaultCurrency,
							color: this.color,
						}
					})
					this.toggleModal()
				}
			},
		}
	}
</script>

<style lang="sass" scoped>
	.modal__add-account
		width: calc(50% - 12px)
</style>