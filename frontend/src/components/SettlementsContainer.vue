<template>
	<v-flex class="dashboard__element" xs12 sm6 md4 d-flex>
		<v-card>
			<dashboard-element-header title="BALANCE CHART"/>

		</v-card>
	</v-flex>
</template>

<script>
	import DashboardElementHeader from './DashboardElementHeader'

	export default {
		components: {
			DashboardElementHeader
		}
	}
</script>