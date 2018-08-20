<template>
	<div style="width: 100%">
		<v-layout class="earnings-expenses-charts__body" justify-space-around row wrap>
			<v-flex md6 xs12 class="p-0">
				<div class="earnings-expenses-charts__header m-0">
					<span class="caption">
						{{ 'By categories' + currencyText}}
					</span>
				</div>
				<doughnut-chart
					:width="280"
					:height="280"
					:type="type">
				</doughnut-chart>
			</v-flex>
			<v-flex md6 xs12 class="p-0">
				<div class="earnings-expenses-charts__header m-0">
					<span class="caption">
						{{ 'By months' + currencyText }}
					</span>
				</div>
				<line-chart
					:width="280"
					:height="280"
					:type="type">
				</line-chart>
			</v-flex>
		</v-layout>
		<active-account-info-table
			:type="type">
		</active-account-info-table>
	</div>
</template>

<script>
import DoughnutChart from './charts/DoughnutChart'
import LineChart from './charts/LineChart'
import ActiveAccountInfoTable from './ActiveAccountInfoTable'

export default {
	components: {
		DoughnutChart,
		LineChart,
		ActiveAccountInfoTable,
	},
	props: ['type', 'currency'],
	computed: {
		currencyText() {
			return this.currency ? ` (in ${this.currency}):` : ':'
		}
	}
}
</script>
