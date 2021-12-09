<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		return {
			props: {
				path: page.path,
			},
		};
	}
</script>

<script lang="ts">
	// Start: Local Imports

	// Start: External Imports
	import '../styles/tailwind.postcss';

	// End: External Imports

	import { discoverEnvironmentFacade } from '$core/services/environment/_environment.facade';
	import Header from '$ui/components/header/Header.svelte';
	import RouteTransition from '$ui/components/route-transition/RouteTransition.svelte';
	import type { IHeaderNavLink } from '$models/interfaces/iheader-nav-link.interface';
	// End: Local Imports

	// Start: Local component properties

	export let path = '';
	/**
	 * @type {IHeaderNavLink}
	 */
	const navLinks: IHeaderNavLink[] = [
		{
			path: '/',
			label: 'Home',
		},
		{
			path: '/about/',
			label: 'About',
		},
	];

	const twitterProfileLink = discoverEnvironmentFacade.twitterConfig.TWITTER_PROFILE_URL;
	const githubRepoLink = discoverEnvironmentFacade.githubRepoUrl;

	// End: Local component properties

	// Start: Local component methods

	const toggleThemeMode = (event: CustomEvent<{ dark: boolean }>): void => {
		const htmlTag = document.getElementsByTagName('html').item(0);
		htmlTag.className = event.detail.dark ? 'dark' : 'light';
	};

	// End: Local component methods
</script>

<div class=" dark:bg-black bg-yellow-50 transition-colors duration-150 ease-in-out">
	<!-- Start: Header Navigation -->
	<Header
		on:toggleTheme="{(e) => toggleThemeMode(e)}"
		gitHubLink="{githubRepoLink}"
		twitterLink="{twitterProfileLink}"
		navLinks="{navLinks}"
	/>
	<!-- End: Header Navigation -->
	<main
		id="skip"
		class="flex flex-col w-full justify-start items-center px-8 bg-yellow-50 dark:bg-black transition-colors duration-150 ease-in-out pt-4"
	>
		<div class="max-w-2xl w-full md:min-w-2xl">
			<!-- Start: Defaull layout slot -->
			<RouteTransition referesh="{path}">
				<slot />
			</RouteTransition>
			<!-- End: Defaull layout slot -->
		</div>
	</main>
</div>
