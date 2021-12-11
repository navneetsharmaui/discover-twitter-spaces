<script lang="ts">
	import type { ITwitterSpace } from '$lib/models/interfaces/itwitter-space.interface';
	import Card from '$ui/components/card/Card.svelte';
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';
	import PopOver from '$ui/components/pop-over/PopOver.svelte';

	export let twitterSpace!: ITwitterSpace;
</script>

<Card>
	<div class="flex flex-col w-full">
		<div class="flex flex-col justify-start items-start mb-1">
			<div class="flex flex-row">
				<ExternalLink href="{twitterSpace.spaceUrl}" ariaLabel="{twitterSpace.title}">
					<h2
						class="text-gray-900 dark:text-gray-100 hover:text-indigo-900 dark:hover:text-indigo-900 text-base md:text-lg leading-tight font-medium"
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
				<p class="text-xs text-gray-900 dark:text-gray-100 ml-1"
					>{twitterSpace.isLive
						? `${twitterSpace.state.slice(0, 1).toUpperCase()}${twitterSpace.state
								.toLowerCase()
								.slice(1, twitterSpace.state.length)}`
						: `Scheduled at ${twitterSpace.scheduledStartTime}`}</p
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
								ariaLabel="{`Host ${host.name}`}"
							>
								<figure
									class="min-w-4xs flex flex-row justify-start items-center bg-gray-200 rounded-full pr-4 hover:shadow"
								>
									<img
										src="{host.imageUrl}"
										alt="{host.name}"
										height="24"
										width="24"
										class="rounded-full h-8 w-8 border-gray-500 border-2"
									/>
									<figcaption
										class="ml-2 hover:text-blue-900 text-gray-900 text-xs leading-tight font-medium"
										>{host.name}</figcaption
									>
								</figure>
							</ExternalLink>
							<div
								slot="content"
								class="block w-44 md:w-52 shadow-md rounded-md z-50 bg-gray-50 dark:bg-gray-900"
							>
								<div class="flex flex-col h-full w-full p-3 gap-3">
									<div class="flex flex-row w-full">
										<ExternalLink
											slot="target"
											href="{host.profileUrl}"
											cssClasses="w-full"
											ariaLabel="{`Host ${host.name}`}"
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
													class="ml-2 hover:text-blue-900 text-black dark:text-white text-xs leading-tight font-medium"
												>
													<small><strong>{host.name}</strong></small>
												</figcaption>
											</figure>
										</ExternalLink>
									</div>
									<div class="w-full">
										<p class="text-xs text-black dark:text-white"
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
	</div>
</Card>
