<template>
	<v-layout class="earnings-expenses__info-table" align-center row wrap>
		<template v-for="item, index in accountInfo">
			<v-flex xs6 class="earnings-expenses__info-row">
				<span>
					{{ item.name }}
				</span>	
			</v-flex>
			<v-flex xs6 class="earnings-expenses__info-row">
				<span>
					{{ item.content }}
				</span>
			</v-flex>
		</template>
	</v-layout>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		props: ['type', 'dataRange'],
		computed: {
			...mapGetters({
				activeAccount: 'getActiveAccount'
			}),
			accountInfo() {
				return [
					{
						name: 'Account name:',
						content: this.activeAccount.name,
					},
					{
						name: 'Current balance:',
						content: parseInt(this.activeAccount.actualBalance).toFixed(2),
					},
					{
						name: 'Currency:',
						content: this.activeAccount.defaultCurrency,
					},
				]
			}
		}
	}
</script>
