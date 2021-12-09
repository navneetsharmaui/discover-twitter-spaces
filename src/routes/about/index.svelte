<script lang="ts" context="module">
	export const prerender = true;
	export const ssr = true;
</script>

<script lang="ts">
	// Start: Local Imports
	// Components
	import HeadTags from '$components/head-tags/HeadTags.svelte';

	// Models
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	// End: Local Imports

	// Start: Local component properties
	/**
	 * @type {IMetaTagProperties}
	 */
	const metaData: Partial<IMetaTagProperties> = {
		title: 'About | Discover Twitter Spaces',
		description:
			'Discover Twitter Spaces is a tool that helps you find the best Twitter Spaces. We use data from Twitter to find the best Twitter Spaces.',
		url: '/about',
		keywords: [
			'Twitter Spaces',
			'Twitter',
			'Spaces',
			'Discover',
			'Discover Twitter Spaces',
			'Discover Twitter Spaces in your area',
		],
		searchUrl: '/about',
	};
	// End: Local component properties
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->

<!-- Start: About page section -->
<div class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
		About
	</h1>
	<div class="mb-8 prose leading-6 text-gray-600 dark:text-gray-400">
		<p>
			Discover Twitter Spaces is a tool that helps you find the best Twitter Spaces in your
			area. We use data from Twitter to find the best Twitter Spaces in your area. You can use
			this tool to find the best Twitter Spaces in your area.
		</p>
	</div>
</div>
<!-- End: About page section -->
