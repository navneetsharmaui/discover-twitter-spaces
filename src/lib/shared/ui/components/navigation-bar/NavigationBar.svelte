<script lang="ts">
	// Svelte Imports
	import Icon from 'svelte-awesome';
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

	import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';

	import { discoverEnvironmentFacade } from '$core/services/environment/_environment.facade';
	import type { IHeaderNavLink } from '$models/interfaces/iheader-nav-link.interface';
	import { page } from '$app/stores';

	// Exports
	const twitterProfileLink = discoverEnvironmentFacade.twitterConfig.TWITTER_PROFILE_URL;
	const githubRepoLink = discoverEnvironmentFacade.githubRepoUrl;

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

	const toggleTheme = (): void => {
		const htmlTag = document.getElementsByTagName('html').item(0);
		htmlTag.className = dark ? 'dark' : 'light';
		dark = !dark;
	};
</script>

<header
	class="relative flex text-black bg-gray-50 dark:bg-zinc-900 bg-opacity-60 dark:text-white transition-colors duration-150 ease-in-out w-full px-8 py-6"
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
					class="p-1.5 text-sm text-black sm:p-2.5 dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-800 hover:shadow rounded-full transition-colors duration-150 ease-in-out"
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
				href="{twitterProfileLink}"
				cssClasses="inline-flex text-black dark:text-white hover:text-zinc-500 dark:hover:text-zinc-500"
				ariaLabel="{`Checkout my Twitter`}"
			>
				<Icon data="{faTwitter}" scale="{1.5}" class="h-5 w-5" />
			</ExternalLink>

			<ExternalLink
				href="{githubRepoLink}"
				cssClasses="inline-flex text-black dark:text-white hover:text-zinc-500 dark:hover:text-zinc-500"
				ariaLabel="{`Checkout on GitHub`}"
			>
				<Icon data="{faGithub}" scale="{1.5}" class="h-5 w-5" />
			</ExternalLink>

			<button
				on:click="{() => toggleTheme()}"
				aria-label="Toggle Dark Mode"
				title="Toggle theme mode"
				type="button"
				class="{'w-7 h-7 bg-gray-50 rounded-full dark:bg-zinc-800 filter shadow dark:shadow-dark dark:hover:shadow-dark hover:border hover:border-gray-500 dark:hover:border-gray-300'}"
			>
				{#if !dark}
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
