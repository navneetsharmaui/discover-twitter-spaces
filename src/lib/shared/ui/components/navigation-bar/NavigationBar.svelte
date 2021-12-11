<script lang="ts">
	// Svelte Imports
	import { createEventDispatcher } from 'svelte';

	import Icon from 'svelte-awesome';
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

	import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';

	// Models
	import type { IHeaderNavLink } from '$models/interfaces/iheader-nav-link.interface';
	import { page } from '$app/stores';

	// Exports
	export let gitHubLink!: string;
	export let twitterLink!: string;

	// Local Properties
	let dark = false;

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

	// Local Methods
	const dispatch = createEventDispatcher();

	const toggleTheme = (): void => {
		dark = !dark;
		dispatch('toggleTheme', {
			dark: dark,
		});
	};
</script>

<header
	class="relative flex text-black bg-gray-50 dark:bg-black bg-opacity-60 dark:text-white transition-colors duration-150 ease-in-out w-full px-8 py-6"
>
	<nav class="flex flex-wrap items-center justify-between w-full max-w-2xl mx-auto">
		<div class="flex flex-row items-center">
			{#each navLinks as navLink, index (navLink.path)}
				<a
					sveltekit:prefetch
					href="{navLink.path}"
					aria-label="{navLink.label}"
					data-link="{navLink.path}"
					title="{navLink.label}"
					class="p-1.5 text-sm text-black sm:p-2.5 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow rounded-lg"
					class:nav-active-route="{$page.path === navLink.path ||
						$page.path === `${navLink.path}/`}"
					class:nav-inactive-route="{$page.path !== navLink.path &&
						$page.path !== `${navLink.path}/`}"
				>
					{navLink.label}
				</a>
			{/each}
		</div>
		<div class="flex flex-row gap-5 items-center">
			<ExternalLink
				href="{twitterLink}"
				cssClasses="inline-flex text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-400"
				ariaLabel="{`Checkout my Twitter`}"
			>
				<Icon data="{faTwitter}" scale="{1.5}" class="h-5 w-5" />
			</ExternalLink>

			<ExternalLink
				href="{gitHubLink}"
				cssClasses="inline-flex text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-400"
				ariaLabel="{`Checkout on GitHub`}"
			>
				<Icon data="{faGithub}" scale="{1.5}" class="h-5 w-5" />
			</ExternalLink>

			<button
				on:click="{() => toggleTheme()}"
				aria-label="Toggle Dark Mode"
				title="Toggle theme mode"
				type="button"
				class="{'w-7 h-7 bg-gray-50 rounded-full dark:bg-gray-800 filter shadow dark:shadow-dark dark:hover:shadow-dark-lg hover:border hover:border-gray-500 dark:hover:border-gray-300'}"
			>
				{#if dark}
					<Icon
						data="{faSun}"
						class="{'h-2 w-2 text-xs text-black dark:text-white'}"
						scale="{1.5}"
					/>
				{:else}
					<Icon
						data="{faMoon}"
						class="{'h-2 w-2 text-xs text-black dark:text-white'}"
						scale="{1.5}"
					/>
				{/if}
			</button>
		</div>
	</nav>
</header>
