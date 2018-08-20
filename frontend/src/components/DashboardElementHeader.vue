<template>
	<v-card-title class="dashboard__element-header">
		<h6>
			{{ title }}
		</h6>
		<v-spacer></v-spacer>
		<slot></slot>
		<v-spacer></v-spacer>
		<v-btn class="btn__dashboard-elem-settings"flat icon>
			<v-icon size="21">
				settings
			</v-icon>
		</v-btn>
	</v-card-title>
</template>

<script>
	export default {
		props: ['title', 'subtitle']
	}
</script>