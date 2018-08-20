<template>
	<v-toolbar class="toolbar" app fixed>
		<v-icon
			color="white"
			class="toolbar__icon"
			@click="toggleDrawer">
			fas fa-list
		</v-icon>
		<v-toolbar-title class="toolbar__title">
			CashVue
		</v-toolbar-title>
		<v-spacer>
		</v-spacer>
		<v-toolbar-items>
			<v-chip
				disabled
				class="toolbar__account-chip" 
				:class="activeAccount.color"
				v-if="activeAccount.name && !$vuetify.breakpoint.smAndDown">
				<v-avatar class="toolbar__account-avatar white">
					<v-icon :color="activeAccount.color">
						account_balance
					</v-icon>
				</v-avatar>
				<span class="toolbar__account-title">
					{{ activeAccount.name }}
				</span>
			</v-chip>
		</v-toolbar-items>
	</v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'Toolbar',
	props: ['items'],
	computed: {
		...mapGetters({
			activeAccount: 'getActiveAccount',
		}),
	},
	methods: {
		...mapActions({
			toggleDrawer: 'toggleDrawer'
		})
	},
}
</script>
