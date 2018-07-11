<template>
	<v-flex class="dashboard__element" xs12 sm6 md3 d-flex>
		<v-card>
			<dashboard-element-header title="LAST EXPENSES" />
			<v-data-table>
			</v-data-table>
		</v-card>
	</v-flex>
</template>

<script>
	import DashboardElementHeader from './DashboardElementHeader'

	export default {
		components: {
			DashboardElementHeader
		},
	}
</script>