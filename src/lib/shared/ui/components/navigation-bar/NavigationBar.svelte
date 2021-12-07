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
	/**
	 * @type {IHeaderNavLink}
	 */
	export let navLinks!: IHeaderNavLink[];
	export let useTitleAndLogo = false;
	export let useThemeModeButton = true;
	export let gitHubLink!: string;
	export let twitterLink!: string;

	// Local Properties
	let dark = false;

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
	class="relative flex text-gray-900 bg-yellow-50 dark:bg-black bg-opacity-60 dark:text-gray-100 transition-colors duration-150 ease-in-out w-full px-8 py-6"
>
	<nav class="flex flex-wrap items-center justify-between w-full max-w-2xl mx-auto">
		<div class="flex flex-row items-center">
			{#each navLinks as navLink, index (navLink.path)}
				<a
					sveltekit:prefetch
					href="{navLink.path}"
					class="p-1.5 text-gray-900 sm:p-2.5 dark:text-gray-100 hover:border-b-2 hover:border-gray-800 dark:hover:border-gray-100"
					class:nav-active-route="{$page.path === navLink.path ||
						$page.path === `${navLink.path}/`}"
					class:nav-inactive-route="{$page.path !== navLink.path &&
						$page.path !== `${navLink.path}/`}"
				>
					{navLink.label}
				</a>
			{/each}
		</div>
		<div class="flex flex-row gap-5">
			<ExternalLink
				href="{twitterLink}"
				cssClasses="inline-flex text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-400"
				ariaLabel="{`Checkout my Twitter`}"
			>
				<Icon data="{faTwitter}" scale="{1.5}" />
			</ExternalLink>

			<ExternalLink
				href="{gitHubLink}"
				cssClasses="inline-flex text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-400"
				ariaLabel="{`Checkout on GitHub`}"
			>
				<Icon data="{faGithub}" scale="{1.5}" />
			</ExternalLink>
		</div>
	</nav>
	{#if useThemeModeButton}
		<button
			on:click="{() => toggleTheme()}"
			aria-label="Toggle Dark Mode"
			type="button"
			class="{useTitleAndLogo
				? 'absolute top-1 right-1 md:top-2 md:right-2 w-8 h-8 bg-yellow-50 rounded-full dark:bg-gray-800 filter shadow hover:shadow-md dark:shadow-dark dark:hover:shadow-dark-lg hover:border-2 hover:border-gray-500 dark:hover:border-gray-300 z-10'
				: 'w-8 h-8 bg-yellow-50 rounded-full dark:bg-gray-800 filter shadow hover:shadow-md dark:shadow-dark dark:hover:shadow-dark-lg hover:border-2 hover:border-gray-500 dark:hover:border-gray-300 z-10'}"
		>
			{#if dark}
				<Icon
					data="{faSun}"
					class="{'h-3 w-3 text-xs text-gray-700 dark:text-gray-100'}"
					scale="{1.5}"
				/>
			{:else}
				<Icon
					data="{faMoon}"
					class="{'h-3 w-3 text-xs text-gray-700 dark:text-gray-100'}"
					scale="{1.5}"
				/>
			{/if}
		</button>
	{/if}
</header>
