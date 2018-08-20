<template>
	<v-dialog 
		max-width="500" 
		class="modal__edit-account"
		v-model="modal">
		<v-btn
			small
			class="btn-control"
			color="primary"
			slot="activator">
			Edit
			<v-icon class="pl-1" size="20">
				edit
			</v-icon>
		</v-btn>
		<v-form ref="editAccountForm" v-model="valid" lazy-validation>
			<v-card>
				<v-card-title>
					<h6>
						EDIT YOUR ACCOUNT
					</h6>
				</v-card-title>
				<v-card-text>
					<v-text-field
						label="Account name"
						:rules="[v => !!v || 'Name is required']"
						v-model="name"
						required>
					</v-text-field>
					<v-text-field
						:rules="[v => !!v || 'Starting balance is required']"
						type="number"
						label="Current balance"
						v-model="balance"
						required>
					</v-text-field>
					<v-select
						:rules="[v => !!v || 'Currency is required']"
						label="Currency"
						v-model="selectedCurrency"
						:items="currencies"
						required>
					</v-select>
					<v-select
						:rules="[v => !!v || 'Color is required']"
						:class="getInputColor()"
						item-avatar
						label="Color"
						v-model="selectedColor"
						:items="colorNames"
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
							@click="editAccount">
							Save
						</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'EditAccount',
	data() {
		return {
			valid: true,
			modal: false,
			name: '',
			balance: 0,
			selectedCurrency: '',
			selectedColor: ''
		}
	},
	computed: {
		...mapGetters({
			activeAccount: 'getActiveAccount',
			currencies: 'getCurrencies',
			accountColors: 'getAccountColors',
		}),
		colorNames() {
			return Object.keys(this.accountColors)
		},
	},
	methods: {
		...mapActions({
			updateUserAccount: 'updateUserAccount'
		}),
		getInputColor() {
			if (this.selectedColor) {
				const colorKey = this.selectedColor
				const colorVal = this.accountColors[this.selectedColor]

				return {
					'account-color': colorVal,
					[colorKey]: colorVal
				}
			}
		},
		toggleModal() {
			this.modal = !this.modal
		},
		editAccount() {
			if (this.$refs.editAccountForm.validate()) {
				console.log(this.name, this.balance, this.selectedColor, this.selectedCurrency)

				this.updateUserAccount({
					id: this.activeAccount.id,
					name: this.name,
					actualBalance: this.balance,
					defaultCurrency: this.selectedCurrency,
					color: this.selectedColor,
				})
				this.toggleModal()
			}
		},
		setAccountValues() {
			this.selectedColor = this.activeAccount.color
			this.selectedCurrency = this.activeAccount.defaultCurrency
			this.balance = this.activeAccount.actualBalance
			this.name = this.activeAccount.name
		}
	},
	watch: {
		'activeAccount.id'() {
			this.setAccountValues()
		},
	},
	mounted() {
		this.setAccountValues()
	}
}
</script>
