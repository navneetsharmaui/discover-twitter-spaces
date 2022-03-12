<script lang="ts">
	import { copy } from '$utils/_copy';
	import Card from '$ui/components/cards/Card.svelte';
	import ExternalLink from '$ui/components/links/ExternalLink.svelte';
	import PopOver from '$ui/components/pop-over/PopOver.svelte';
	import type { TwitterSpace } from '$models/classes/twitter-space.class';

	export let twitterSpace!: TwitterSpace;

	const getStateText = (isLive: boolean, state: string, time = '') =>
		isLive
			? `${state.slice(0, 1).toUpperCase()}${state.toLowerCase().slice(1, state.length)}`
			: `Scheduled at ${time}`;
</script>

<Card>
	<div
		class="flex flex-col w-full relative"
		aria-label="{twitterSpace.title}"
		title="{twitterSpace.title}"
	>
		<div class="flex flex-col justify-start items-start mb-1">
			<div class="w-full text-ellipsis overflow-hidden flex flex-row">
				<ExternalLink href="{twitterSpace.spaceUrl}" ariaLabel="{twitterSpace.title}">
					<h2
						class="break-words text-gray-900 dark:text-gray-100 hover:text-indigo-900 dark:hover:text-zinc-400 text-base md:text-lg leading-tight font-medium capitalize pr-4"
					>
						{twitterSpace.title}
					</h2>
				</ExternalLink>
			</div>
			<div
				class="flex flex-row items-center mt-3"
				aria-label="{twitterSpace.isLive
					? `${twitterSpace.state.slice(0, 1).toUpperCase()}${twitterSpace.state
							.toLowerCase()
							.slice(1, twitterSpace.state.length)}`
					: `Scheduled at ${twitterSpace.scheduledStartTime}`}"
			>
				<div
					class="block w-2 h-2 rounded-full {twitterSpace.isLive
						? 'bg-red-500'
						: 'bg-gray-600'}"></div>
				<p
					class="text-[0.7rem] md:text-xs text-gray-900 dark:text-gray-100 ml-1"
					title="{getStateText(
						twitterSpace.isLive,
						twitterSpace.state,
						twitterSpace.scheduledStartTime,
					)}"
					>{getStateText(
						twitterSpace.isLive,
						twitterSpace.state,
						twitterSpace.scheduledStartTime,
					)}</p
				>
			</div>
		</div>
		<div class="flex flex-col my-2">
			<div class="mb-2">
				<small class="text-xs text-gray-900 dark:text-gray-100 font-semibold">Hosts</small>
			</div>
			<div class="flex flex-row flex-wrap w-full gap-4">
				{#each twitterSpace.hosts as host, index (host.id)}
					<div class="flex flex-row my-2 md:my-0 justify-start items-center">
						<PopOver>
							<ExternalLink
								slot="target"
								href="{host.profileUrl}"
								cssClasses="flex flex-row justify-start items-center"
								ariaLabel="{`Host ${host.name || 'Profile'}`}"
							>
								<figure
									class="min-w-4xs flex flex-row justify-start items-center bg-gray-200 dark:bg-zinc-700 rounded-full pr-4 hover:shadow"
								>
									<img
										src="{host.imageUrl}"
										alt="{host.name}"
										height="24"
										width="24"
										class="break-words rounded-full h-8 w-8 border-gray-500 dark:border-zinc-300 border-2"
									/>
									<figcaption
										class="ml-2 hover:text-blue-900 text-gray-900 dark:text-white text-xs leading-tight font-medium capitalize"
										>{host.name}</figcaption
									>
								</figure>
							</ExternalLink>
							<div
								slot="content"
								class="block w-44 md:w-52 shadow-md rounded-md z-50 bg-gray-50 dark:bg-zinc-800"
							>
								<div class="flex flex-col h-full w-full p-3 gap-3">
									<div class="flex flex-row w-full">
										<ExternalLink
											slot="target"
											href="{host.profileUrl}"
											cssClasses="w-full"
											ariaLabel="{`Host ${host.name || 'Profile'}`}"
										>
											<figure
												class="flex flex-row justify-start items-center rounded-full pr-4"
											>
												<img
													src="{host.imageUrl}"
													alt="{host.name}"
													height="24"
													width="24"
													class="rounded-full h-8 w-8 border-gray-500 border-2"
												/>
												<figcaption
													class="break-all ml-2 hover:text-blue-900 text-black dark:text-white text-xs leading-tight font-medium capitalize"
												>
													<small><strong>{host.name}</strong></small>
												</figcaption>
											</figure>
										</ExternalLink>
									</div>
									<div class="w-full">
										<p
											class="text-xs text-black whitespace-pre-wrap break-all dark:text-white"
											><small>{host.description}</small></p
										>
									</div>
									<div class="flex flex-row w-full gap-3">
										<p class="text-xs text-black dark:text-white"
											><small
												><strong>Followers {host.followersCount}</strong
												></small
											></p
										>
										<p class="text-xs text-black dark:text-white"
											><small
												><strong>Following {host.followingCount}</strong
												></small
											></p
										>
									</div>
								</div>
							</div>
						</PopOver>
					</div>
				{/each}
			</div>
		</div>
		<div class="flex flex-row w-full justify-start mt-4">
			<ExternalLink
				href="{twitterSpace.spaceUrl}"
				cssClasses="bg-indigo-700 hover:bg-indigo-800 text-white active:-indigo-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
				ariaLabel="{`Space url ${twitterSpace.spaceUrl}`}"
			>
				Join Space
			</ExternalLink>
		</div>
		<div class="absolute top-0 right-0">
			<button
				type="button"
				use:copy="{twitterSpace.spaceUrl}"
				title="{`Copy Space url ${twitterSpace.spaceUrl}`}"
				aria-label="{`Copy Space url ${twitterSpace.spaceUrl}`}"
			>
				<svg
					aria-hidden="true"
					focusable="false"
					data-prefix="far"
					data-icon="copy"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
					class="h-4 w-4 text-xs text-zinc-800 dark:text-zinc-400 m-auto"
					><path
						fill="currentColor"
						d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"
						class=""></path></svg
				>
			</button>
		</div>
	</div>
</Card>
