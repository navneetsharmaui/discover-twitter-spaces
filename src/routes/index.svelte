<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		return {
			props: {
				twitterSpaces: await fetch(`/api/spaces.json`).then((res: { json: () => any }) =>
					res.json(),
				),
			},
		};
	}
</script>

<script lang="ts">
	// Start: Imports
	import HeadTags from '$components/head-tags/HeadTags.svelte';
	import SpaceCard from '$lib/shared/ui/components/space-card/SpaceCard.svelte';
	import GhostSpaceCard from '$lib/shared/ui/components/ghost-space-card/GhostSpaceCard.svelte';
	import SearchForm from '$lib/shared/components/search-form/SearchForm.svelte';
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	import type { ITwitterSpace } from '$lib/models/interfaces/itwitter-space.interface';
	import { api } from '$lib/core/services/https/_api';
	import { spacesStore } from '$stores/spaces-store';

	// Exports
	// Start: Local component properties
	/**
	 * @type {IMetaTagProperties}
	 */
	const metaData: Partial<IMetaTagProperties> = {
		title: `Twitter Spaces`,
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

	let searchedField = '';

	// End: Local component properties

	// Start: Local component methods
	export let twitterSpaces: ITwitterSpace[];

	let isLoading = false;

	const fetchSpaces = async (value?: string) => {
		return !value
			? await api(`/api/spaces.json`)
			: await api(`/api/spaces.json?search=${value}`);
	};

	const setTwitterSpaces = async (input: CustomEvent<string>): Promise<void> => {
		isLoading = true;
		const response = await fetchSpaces(input.detail);
		twitterSpaces = response.body as unknown as ITwitterSpace[];
		spacesStore.set(twitterSpaces);
		searchedField = input.detail.toUpperCase();
		isLoading = false;
	};

	// End: Local component methods
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->

<!-- Start: Home Page container -->
<div class="flex flex-col justify-center items-start min-w-full mx-auto mb-16">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
		Discover Spaces
	</h1>
	<p class="prose text-gray-600 dark:text-gray-400 mb-10">
		Search the twitter space for your interests. You can also search for people and topics. You
		can also search for spaces by category.
	</p>
	<SearchForm on:submitSearchField="{(e) => setTwitterSpaces(e)}" />
	<div class="border-t border-gray-400 w-full my-2"> </div>
	<div class="w-full">
		<p class="text-gray-900 dark:text-gray-100 mx-1">
			<small
				>About {$spacesStore.length}
				{searchedField ? `results for ${searchedField}.` : 'results.'}</small
			>
		</p>
	</div>
	<div class="flex flex-col w-full mt-5 gap-5">
		{#if isLoading}
			{#each [0, 1, 2, 3, 4] as num, index (num)}
				<GhostSpaceCard />
			{/each}
		{:else if !isLoading}
			{#each twitterSpaces as space, index (space.spaceId)}
				<SpaceCard twitterSpace="{space}" />
			{/each}
		{/if}
	</div>
</div>
<!-- End: Home Page container -->
