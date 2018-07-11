<template>
	<v-flex class="dashboard__element" xs12 sm6 md3 d-flex>
		<v-card>
			<dashboard-element-header title="LAST EARNINGS" />
			<v-data-table>
			</v-data-table>
		</v-card>
	</v-flex>
</template>

<script>
	import DashboardElementHeader from './DashboardElementHeader'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			DashboardElementHeader
		},
		computed: {
			...mapGetters({
				activeAccount: 'getActiveAccount',
			}),
		},
		watch: {
			'activeAccount.id': () => {
				console.log('CHANGED')
			}
		}
	}
</script>