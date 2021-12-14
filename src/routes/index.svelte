<script lang="ts" context="module">
	export const load: Load = async ({ page }) => {
		return {
			props: {
				searchTerm: page.query.get('q') || 'Web',
			},
		};
	};
</script>

<script lang="ts">
	// Start: Imports
	import Seo from '$components/seo/SEO.svelte';
	import SearchForm from '$components/search-form/SearchForm.svelte';
	import SpaceCard from '$ui/components/space-card/SpaceCard.svelte';
	import GhostSpaceCard from '$ui/components/ghost-space-card/GhostSpaceCard.svelte';
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	import type { ITwitterSpace } from '$models/interfaces/itwitter-space.interface';
	import type { IResponseEndpointOutput } from '$models/interfaces/iresponse-endpoint.interface';
	import { api } from '$core/services/https/_api';
	import type { Load } from '@sveltejs/kit';

	// Exports
	export let searchTerm: string;

	// Start: Local component properties
	/**
	 * @type {IMetaTagProperties}
	 */
	const metaData: Partial<IMetaTagProperties> = {
		title: `Discover Twitter Spaces`,
		description:
			'Discover twitter spaces and join them to get access to the most interesting content. Join the conversation and share your thoughts.',
		keywords: [
			'twitter',
			'spaces',
			'community',
			'discussion',
			'social',
			'media',
			'news',
			'blog',
		],
	};

	let searchedField = 'Web';
	let numOfResults = 0;

	// End: Local component properties

	// Start: Local component methods

	const fetchSpaces = async (value?: string) => {
		return !value
			? await api<ITwitterSpace[]>(`/api/spaces.json`)
			: await api<ITwitterSpace[]>(`/api/spaces.json?search=${value}`);
	};

	const mapToITwitterSpaces = (
		spaces: IResponseEndpointOutput<ITwitterSpace[]>,
	): ITwitterSpace[] => {
		const twitterSpaces = spaces.body;
		numOfResults = twitterSpaces.length;
		return twitterSpaces;
	};

	let twitterSpaces =
		searchTerm && searchTerm.length >= 3 ? fetchSpaces(searchTerm) : fetchSpaces('Web');

	const setTwitterSpaces = async (input: CustomEvent<string>): Promise<void> => {
		twitterSpaces = fetchSpaces(input.detail);
		searchedField = input.detail.toUpperCase();
	};

	// End: Local component methods
</script>

<!-- Start: Header Tag -->
<Seo metaData="{metaData}" />
<!-- End: Header Tag -->

<!-- Start: Home Page container -->
<div class="flex flex-col justify-center items-start min-w-full mx-auto mb-16">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
		Discover Spaces
	</h1>
	<p class="prose text-gray-600 dark:text-gray-100 mb-10">
		Search the twitter space for your interests. You can also search for people and topics. You
		can also search for spaces by category.
	</p>
	<SearchForm searchValue="{searchTerm}" on:submitSearchField="{(e) => setTwitterSpaces(e)}" />
	<div class="border-t border-gray-400 w-full my-2"> </div>
	<div class="w-full">
		<p class="text-gray-900 dark:text-gray-100 mx-1">
			<small
				>About {numOfResults}
				{searchedField ? `results for ${searchedField}.` : 'results.'}</small
			>
		</p>
	</div>
	<div class="flex flex-col w-full mt-5 gap-5">
		{#await twitterSpaces}
			{#each [0, 1, 2, 3, 4] as num, index (num)}
				<GhostSpaceCard />
			{/each}
		{:then spaces}
			{#each mapToITwitterSpaces(spaces) as space, index (space.spaceId)}
				<SpaceCard twitterSpace="{space}" />
			{/each}
		{:catch error}
			<p class="text-red-600">{error.message}</p>
		{/await}
	</div>
</div>
<!-- End: Home Page container -->
