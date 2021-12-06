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
	import Card from '$ui/components/card/Card.svelte';
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	import { humanReadableTime } from '$lib/utils/_date-formatters';

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
	// End: Local component properties

	// Start: Local component methods

	onMount(() => {
		console.log(spaces);
	});

	const scheduledDate = humanReadableTime(new Date('2021-12-07T20:00:14.000Z'));

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
	<p class="prose text-gray-600 dark:text-gray-400 mb-14">
		Search the twitter space for your interests. You can also search for people and topics.
	</p>
	<div class="flex flex-col mb-4 w-full">
		<div class="relative w-full mb-4">
			<input
				bind:value="{searchValue}"
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
	<div class="flex flex-col w-full mt-8 gap-4">
		<Card>
			<div class="flex flex-col w-full">
				<div class="flex flex-col justify-start items-start mb-1">
					<div class="flex flex-row">
						<h5
							class="text-gray-900 dark:text-gray-100 text-sm md:text-lg leading-tight font-medium"
						>
							🌐Tech News around the World
						</h5>
					</div>
					<div class="flex flex-row items-center mx-1 mt-3">
						<div class="block w-2 h-2 bg-red-500 rounded-full"></div>
						<p class="text-xs text-gray-900 dark:text-gray-100 ml-1">Live</p>
					</div>
				</div>
				<div class="flex flex-col my-2 mx-1">
					<div class="mb-2">
						<small class="text-xs text-gray-900 dark:text-gray-100 font-semibold"
							>Hosts</small
						>
					</div>
					<div class="flex flex-row flex-wrap w-full">
						<div
							class="flex flex-row w-1/2 md:w-1/4 my-2 md:my-0 justify-start items-center"
						>
							<a
								href="https://twitter.com/juarez_venus"
								target="_blank"
								class="flex flex-row justify-start items-center"
							>
								<div class="mr-2">
									<figure>
										<img
											src="https://pbs.twimg.com/profile_images/1278259160644227073/MfCyF7CG_normal.jpg"
											alt="some asdasd"
											height="24"
											width="24"
											class="rounded-full h-6 w-6"
										/>
									</figure>
								</div>
								<div class="flex flex-col justify-start items-start">
									<h6
										class="hover:text-gray-600 text-gray-900 dark:text-gray-100 text-xs leading-tight font-medium"
									>
										Some Name
									</h6>
								</div>
							</a>
						</div>
					</div>
				</div>
				<div class="flex flex-row w-full justify-start mt-4">
					<a
						href="https://twitter.com/hashtag/tech?src=hash"
						class="bg-gray-300 text-gray-900 active:bg-gray-400 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
						target="_blank"
					>
						Join Space
					</a>
				</div>

				<div class="flex flex-row w-full"></div>
			</div>
		</Card>
		<Card>
			<div class="flex flex-col w-full">
				<div class="flex flex-col justify-start items-start mb-1">
					<div class="flex flex-row">
						<h5
							class="text-gray-900 dark:text-gray-100 text-sm md:text-lg leading-tight font-medium"
						>
							🌐Tech News around the World
						</h5>
					</div>
					<div class="flex flex-row items-center mx-1 mt-3">
						<div class="block w-2 h-2 bg-gray-600 rounded-full"></div>
						<p class="text-xs text-gray-900 dark:text-gray-100 ml-1"
							>Scheduled at {scheduledDate}</p
						>
					</div>
				</div>
				<div class="flex flex-col my-2 mx-1">
					<div class="mb-2">
						<small class="text-xs text-gray-900 dark:text-gray-100 font-semibold"
							>Hosts</small
						>
					</div>
					<div class="flex flex-row flex-wrap w-full">
						<div
							class="flex flex-row w-1/2 md:w-1/4 my-2 md:my-0 justify-start items-center"
						>
							<a
								href="https://twitter.com/juarez_venus"
								target="_blank"
								class="flex flex-row justify-start items-center"
							>
								<div class="mr-2">
									<figure>
										<img
											src="https://pbs.twimg.com/profile_images/1278259160644227073/MfCyF7CG_normal.jpg"
											alt="some asdasd"
											height="24"
											width="24"
											class="rounded-full h-6 w-6"
										/>
									</figure>
								</div>
								<div class="flex flex-col justify-start items-start">
									<h6
										class="hover:text-gray-600 text-gray-900 dark:text-gray-100 text-xs leading-tight font-medium"
									>
										Some Name
									</h6>
								</div>
							</a>
						</div>
						<div
							class="flex flex-row w-1/2 md:w-1/4 my-2 md:my-0 justify-start items-center"
						>
							<a
								href="https://twitter.com/juarez_venus"
								target="_blank"
								class="flex flex-row justify-start items-center"
							>
								<div class="mr-2">
									<figure>
										<img
											src="https://pbs.twimg.com/profile_images/1278259160644227073/MfCyF7CG_normal.jpg"
											alt="some asdasd"
											height="24"
											width="24"
											class="rounded-full h-6 w-6"
										/>
									</figure>
								</div>
								<div class="flex flex-col justify-start items-start">
									<h6
										class="hover:text-gray-600 text-gray-900 dark:text-gray-100 text-xs leading-tight font-medium"
									>
										Some Name
									</h6>
								</div>
							</a>
						</div>
					</div>
				</div>
				<div class="flex flex-row w-full justify-start mt-4">
					<a
						href="https://twitter.com/hashtag/tech?src=hash"
						class="bg-gray-300 text-gray-900 active:bg-gray-400 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
						target="_blank"
					>
						Join Space
					</a>
				</div>

				<div class="flex flex-row w-full"></div>
			</div>
		</Card>
	</div>
</div>
<!-- End: Home Page container -->
