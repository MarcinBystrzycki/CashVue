<template>
	<v-container>
		<v-layout class="mb-3 caption" row>
			<v-flex text-left>
				{{ `By categories (in ${this.currency}):` }}
			</v-flex>
			<v-flex text-left>
				{{ `By months (in ${this.currency}):` }}
			</v-flex>
		</v-layout>
		<v-layout justify-space-around row>
			<pie-chart
				:width="280"
				:height="280"
				:options="{responsive: true, maintainAspectRatio: false}"
				:dateRange="dateRange"
				:type="type">
			</pie-chart>
			<line-chart
				:width="280"
				:height="280"
				:options="{responsive: true, maintainAspectRatio: false}"
				:dateRange="dateRange"
				:type="type">
			</line-chart>
		</v-layout>
	</v-container>
</template>

<script>
	import PieChart from './charts/PieChart'
	import LineChart from './charts/LineChart'

	export default {
		components: {
			PieChart,
			LineChart,
		},
		props: ['type', 'dateRange', 'currency'],
	}
</script>