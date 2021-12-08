<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		return {
			props: {
				spaces: await fetch(`/api/spaces.json`).then((res: { json: () => any }) =>
					res.json(),
				),
			},
		};
	}
</script>

<script lang="ts">
	// Start: Imports
	import { onMount } from 'svelte';
	import HeadTags from '$components/head-tags/HeadTags.svelte';
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	import { humanReadableTime } from '$lib/utils/_date-formatters';
	import SpaceCard from '$lib/shared/ui/components/space-card/SpaceCard.svelte';
	import GhostSpaceCard from '$lib/shared/ui/components/ghost-space-card/GhostSpaceCard.svelte';
	import type { ITwitterSpaceCard } from '$lib/models/interfaces/itwitter-space-card.interface';
	import { api } from '$lib/core/services/https/_api';
	import { debounce } from '$lib/utils/_debounce';

	// Exports
	export let spaces!: any;
	// Start: Local component properties
	/**
	 * @type {IMetaTagProperties}
	 */
	const metaData: Partial<IMetaTagProperties> = {
		title: `Twitter Spaces`,
		description:
			'Slice of my world for eveyone on web. Here you can see projects I made and blogs I wrote.',
		keywords: [
			'Navneet Sharma',
			"Navneet's Blog",
			'Navneet Sharma Developer',
			"Navneet Sharma's Portfolio",
		],
	};

	let searchValue = '';

	const twitterSpaces: ITwitterSpaceCard[] = [
		{
			title: '🌐Tech News around the World',
			spaceUrl: 'https://twitter.com/hashtag/tech?src=hash',
			scheduledStartTime: humanReadableTime(new Date('2021-12-07T20:00:14.000Z')),
			state: 'scheduled',
			spaceId: 'INXwerwerSD',
			description: '',
			hosts: [
				{
					profileUrl: 'https://twitter.com/juarez_venus',
					imageUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
					name: 'Kate Horwitz',
					id: 'juarez',
				},
				{
					profileUrl: 'https://twitter.com/juarez_venus',
					imageUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
					name: 'Kate Horwitz',
					id: 'juarez_venus',
				},
			],
		},
		{
			title: '🌐Tech News around the World',
			spaceUrl: 'https://twitter.com/hashtag/tech?src=hash',
			scheduledStartTime: humanReadableTime(new Date('2021-12-07T20:00:14.000Z')),
			state: 'live',
			spaceId: 'INXwerwerSS',
			description: '',
			hosts: [
				{
					profileUrl: 'https://twitter.com/juarez_venus',
					imageUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
					name: 'Kate Horwitz',
					id: 'juarez_venus',
				},
			],
		},
	];
	// End: Local component properties

	// Start: Local component methods

	onMount(() => {
		console.log(spaces);
	});

	const fetchSpaces = async (value: string) => {
		const response = await api(`/api/spaces.json?search=${value}`);
		console.log(response);
	};

	const handleSearch = async (input: string): Promise<void> => {
		if (input.length >= 3) {
			debounce(fetchSpaces, 200)(input);
		}
	};

	// End: Local component methods
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->

<!-- Start: Home Page container -->
<div class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
		Discover Spaces
	</h1>
	<p class="prose text-gray-600 dark:text-gray-400 mb-10">
		Search the twitter space for your interests. You can also search for people and topics.
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
				>
					<option>Value 1</option>
					<option>Value 2</option>
					<option>Value 3</option>
				</select>
			</label>
		</div>
	</div>
	<div class="border-t border-gray-400 w-full my-2"> </div>
	<div class="w-full">
		<p class="text-gray-900 dark:text-gray-100 mx-1">
			<small>About {twitterSpaces.length} results</small>
		</p>
	</div>
	<div class="flex flex-col w-full mt-5 gap-5">
		{#each twitterSpaces as twitterSpace, index (twitterSpace.spaceId)}
			<SpaceCard twitterSpace="{twitterSpace}" />
		{/each}
		<GhostSpaceCard />
	</div>
</div>
<!-- End: Home Page container -->
