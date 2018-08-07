<template>
	<v-container class="p-0" fluid grid-list-sm>
			<v-layout row wrap>
				<accounts-container />
				<active-account-container />
			</v-layout>
	</v-container>
</template>

<script>
	import AccountsContainer from '../components/AccountsContainer'
	import ActiveAccountContainer from '../components/ActiveAccountContainer'
	import { mapActions } from 'vuex'

	export default {
		components: {
			AccountsContainer,
			ActiveAccountContainer,
		},
		methods: {
			...mapActions({
				getUserAccounts: 'getUserAccounts',
			}),
		},
		created() {
			this.getUserAccounts()
		}
	}
</script>

<style>
	
</style>