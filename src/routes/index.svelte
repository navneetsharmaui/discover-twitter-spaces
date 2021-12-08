<script lang="ts">
	// Start: Imports
	import HeadTags from '$components/head-tags/HeadTags.svelte';
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	import SpaceCard from '$lib/shared/ui/components/space-card/SpaceCard.svelte';
	import GhostSpaceCard from '$lib/shared/ui/components/ghost-space-card/GhostSpaceCard.svelte';
	import { api } from '$lib/core/services/https/_api';
	import { mapToTwitterSpaces } from '$lib/utils/_mapper';
	import { spacesStore } from '$stores/spaces-store';
	import { SPACE_CATEGORIES } from '$lib/data/spaces-categories';

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

	let searchValue = '';
	let selectedValue = 'category';

	// End: Local component properties

	// Start: Local component methods

	const fetchSpaces = async (value?: string) => {
		return !value
			? await api(`/api/spaces.json`)
			: await api(`/api/spaces.json?search=${value}`);
	};

	let twitterSpaces = fetchSpaces();

	const handleSearch = async (input: string): Promise<void> => {
		if (input.length >= 3) {
			selectedValue = 'category';
			twitterSpaces = fetchSpaces(input);
		}
	};

	const handleSelect = async (input: string): Promise<void> => {
		if (input.length >= 3 && input !== searchValue && input !== 'category') {
			searchValue = '';
			twitterSpaces = fetchSpaces(input);
		}
	};

	const handleSpaceResponse = (value: unknown) => {
		const spaces = mapToTwitterSpaces(value);
		spacesStore.set(spaces);

		return spaces;
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
	<div class="flex flex-col mb-4 w-full">
		<div class="relative w-full mb-4">
			<input
				bind:value="{searchValue}"
				on:input="{() => handleSearch(searchValue)}"
				aria-label="Search articles"
				type="text"
				placeholder="Search articles"
				class="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-yellow-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
			/>
			<svg
				class="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="{2}"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
			</svg>
		</div>

		<div class="w-full mb-4">
			<label class="block" for="category">
				<select
					class="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-yellow-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
					name="category"
					id="category"
					bind:value="{selectedValue}"
					on:change="{() => handleSelect(selectedValue)}"
				>
					{#each SPACE_CATEGORIES as category, index (category.id)}
						<option value="{category.id}">{category.label}</option>
					{/each}
				</select>
			</label>
		</div>
	</div>
	<div class="border-t border-gray-400 w-full my-2"> </div>
	<div class="w-full">
		<p class="text-gray-900 dark:text-gray-100 mx-1">
			<small>About {$spacesStore.length} results</small>
		</p>
	</div>
	<div class="flex flex-col w-full mt-5 gap-5">
		{#await twitterSpaces}
			{#each [0, 1, 2, 3] as num, index (num)}
				<GhostSpaceCard />
			{/each}
		{:then spaces}
			{#each handleSpaceResponse(spaces.body) as space, index (space.spaceId)}
				<SpaceCard twitterSpace="{space}" />
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
</div>
<!-- End: Home Page container -->
