<script lang="ts" context="module">
	export const load: Load = async ({ page }) => {
		return {
			props: {
				path: page.path,
			},
		};
	};
</script>

<script lang="ts">
	// Start: Local Imports

	// Start: External Imports
	import '../styles/tailwind.postcss';
	// End: External Imports

	import Header from '$ui/components/header/Header.svelte';
	import RouteTransition from '$ui/components/route-transition/RouteTransition.svelte';
	import type { Load } from '@sveltejs/kit';
	// End: Local Imports

	// Start: Local component properties

	export let path = '';

	// End: Local component properties

	// Start: Local component methods

	// End: Local component methods
</script>

<div class=" dark:bg-zinc-900 bg-gray-50 transition-colors duration-150 ease-in-out">
	<!-- Start: Header Navigation -->
	<Header />
	<!-- End: Header Navigation -->
	<main
		class="flex flex-col w-full justify-start items-center px-8 bg-gray-50 dark:bg-zinc-900 transition-colors duration-150 ease-in-out pt-4"
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
