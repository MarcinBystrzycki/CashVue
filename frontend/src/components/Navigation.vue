<template>
	<v-navigation-drawer app id="nav" :value="drawer" fixed>
		<v-list dense class="navigation_list">
			<router-link to="/">
				<v-list-tile class="navigation__elem">
					<v-list-tile-action>
						<v-icon>fas fa-home</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>
							Home
						</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</router-link>
			<v-list-group v-if="authenticated">
				<v-list-tile class="navigation__elem pl-1" slot="activator">
					<v-list-tile-action>
						<v-icon>fas fa-wallet</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>
							Wallet
						</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<router-link to="/dashboard">
					<v-list-tile class="navigation__elem pl-4">
						<v-list-tile-action>
							<v-icon>fas fa-wallet</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>
								Dashboard
							</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</router-link>
				<router-link to="/expenses">
					<v-list-tile class="navigation__elem pl-4">
						<v-list-tile-action>
							<v-icon>fas fa-wallet</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>
								Expenses
							</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</router-link>
				<router-link to="/earnings">
					<v-list-tile class="navigation__elem pl-4">
						<v-list-tile-action>
							<v-icon>fas fa-wallet</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>
								Earnings
							</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</router-link>
			</v-list-group>
			<router-link to="/profile">
				<v-list-tile class="navigation__elem" v-if="authenticated">
					<v-list-tile-action>
						<v-icon>fas fa-users-cog</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>
							Profile
						</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</router-link>
			<a href="#"
				@click="login()"
				v-if="!authenticated">
				<v-list-tile class="navigation__elem log in">
					<v-list-tile-action>
						<v-icon>fas fa-sign-in-alt</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>
							Log in
						</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</a>
			<a href="#"
				@click="logout()"
				v-if="authenticated">
				<v-list-tile class="navigation__elem log out">
					<v-list-tile-action>
						<v-icon>fas fa-sign-out-alt</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>
							Log out
						</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</a>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Navigation',
	props: ['authenticated'],
	computed: {
		login () {
			this.$emit('login')
		},
		logout () {
			this.$emit('logout')
		},
		...mapGetters({
			drawer: 'getDrawer'
		})
	}
}
</script>

<style lang="sass" scoped>
#nav
	height: 100vh
	.navigation_list
		list-style-type: none
		padding: 0
		height: 100%
		display: flex
		flex-direction: column
		position: relative
		i
			font-size: 1.5em
	a
		font-weight: bold
		color: #2c3e50
		font-size: 1.5em
		&.router-link-exact-active
			color: #41b883
		&:hover
			text-decoration: none
			color: #41b883
	.navigation__elem
		margin: 0.5em
		.log
			position: relative
			bottom: 0
	.list__group--active
		&::before,
		&::after
			background: transparent
</style>
