<template>
	<div>
		<v-layout class="earnings-expenses-charts__body" justify-space-around row wrap>
			<v-flex md6 xs12 class="p-0">
				<div class="earnings-expenses-charts__header m-0">
					<span class="caption">
						{{ `By categories (in ${this.currency}):` }}
					</span>
				</div>
				<pie-chart
					:width="280"
					:height="280"
					:options="{responsive: true, maintainAspectRatio: false}"
					:dateRange="dateRange"
					:type="type">
				</pie-chart>
			</v-flex>
			<v-flex md6 xs12 class="p-0">
				<div class="earnings-expenses-charts__header m-0">
					<span class="caption">
						{{ `By months (in ${this.currency}):` }}
					</span>
				</div>
				<line-chart
					:width="280"
					:height="280"
					:options="{responsive: true, maintainAspectRatio: false}"
					:dateRange="dateRange"
					:type="type">
				</line-chart>
			</v-flex>
		</v-layout>
		<earnings-expenses-info-table 
			:type="type"
			:dateRange="dateRange">
		</earnings-expenses-info-table>
	</div>
</template>

<script>
	import PieChart from './charts/PieChart'
	import LineChart from './charts/LineChart'
	import EarningsExpensesInfoTable from './EarningsExpensesInfoTable'

	export default {
		components: {
			PieChart,
			LineChart,
			EarningsExpensesInfoTable,
		},
		props: ['type', 'dateRange', 'currency'],
	}
</script>