<template>
	<v-dialog 
		max-width="500" 
		class="modal__add-account"
		v-model="modal">
		<v-btn
			class="btn__add-account"
			slot="activator"
			outline>
			Add account
			<v-icon class="pl-1" size="24">
				add_circle_outline
			</v-icon>
		</v-btn>
		<v-card>
			<v-card-title>
				<h6>
					ADD YOUR NEW ACCOUNT
				</h6>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field
						v-model="name"
						label="Account name"
						required>
					</v-text-field>
					<v-text-field
						v-model="balance"
						type="number"
						label="Starting balance"
						required>
					</v-text-field>
					<v-select
						:items="currencies"
						v-model="defaultCurrency"
						label="Currency"
						required>
					</v-select>
					<v-select
						:class="getInputColor()"
						:items="colorNames"
						item-avatar
						v-model="color"
						label="Color"
						required>
					</v-select>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-flex>
					<v-btn @click="toggleModal">
						Cancel
					</v-btn>
					<v-btn @click="addNewAccount">
						Save
					</v-btn>
				</v-flex>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		name: 'AddAccount',
		data() {
			return {
				modal: false,
				name: '',
				balance: 0,
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
				this.saveNewAccount({
					tokenID: localStorage.id_token,
					account: {
						name: this.name,
						balance: this.balance,
						defaultCurrency: this.defaultCurrency,
						color: this.color,
					}
				})
				this.toggleModal()
			},
		}
	}
</script>

<style lang="sass" scoped>
	.modal__add-account
		width: calc(50% - 12px)
</style>