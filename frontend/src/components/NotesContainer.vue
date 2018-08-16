<template>
	<v-flex class="dashboard__element" xs12 sm6 md4 d-flex>
		<v-card>
			<dashboard-element-header title="YOUR NOTES"/>
			<notes-component />
		</v-card>
	</v-flex>
</template>

<script>
	import DashboardElementHeader from './DashboardElementHeader'
	import NotesComponent from './NotesComponent'

	export default {
		components: {
			DashboardElementHeader,
			NotesComponent
		}
	}
</script>