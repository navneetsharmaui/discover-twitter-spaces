<script lang="ts">
	// Svelte Imports
	import { createEventDispatcher } from 'svelte';

	import Icon from 'svelte-awesome';
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

	// Models
	import type { IHeaderNavLink } from '$models/interfaces/iheader-nav-link.interface';
	import ModernImage from '$ui/components/modern-image/ModernImage.svelte';
	import type { IModernImage } from '$models/interfaces/imodern-image.interface';
	import { page } from '$app/stores';

	// Exports
	/**
	 * @type {IHeaderNavLink}
	 */
	export let navLinks!: IHeaderNavLink[];
	export let useTitleAndLogo = false;
	export let useThemeModeButton = true;

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

<header class="relative flex text-gray-900 bg-yellow-50 dark:bg-black bg-opacity-60 dark:text-gray-100 w-full">
	<nav class="flex flex-wrap items-center justify-between w-full max-w-2xl p-6 mx-auto">
		<div class="flex flex-row items-center">
			{#each navLinks as navLink, index (navLink.path)}
				<a
					sveltekit:prefetch
					href="{navLink.path}"
					class="p-1.5 text-gray-900 sm:p-3.5 dark:text-gray-100 hover:border-b-2 hover:border-gray-800 dark:hover:border-gray-100"
					class:nav-active-route="{$page.path === navLink.path || $page.path === `${navLink.path}/`}"
					class:nav-inactive-route="{$page.path !== navLink.path && $page.path !== `${navLink.path}/`}"
				>
					{navLink.label}
				</a>
			{/each}
		</div>
	</nav>
	{#if useThemeModeButton}
		<button
			on:click="{() => toggleTheme()}"
			aria-label="Toggle Dark Mode"
			type="button"
			class="{useTitleAndLogo
				? 'sticky-theme-mode-button w-8 h-8 bg-yellow-50 rounded-full dark:bg-gray-800 filter shadow hover:shadow-md dark:shadow-dark dark:hover:shadow-dark-lg hover:border-2 hover:border-gray-500 dark:hover:border-gray-300 z-10'
				: 'w-8 h-8 bg-yellow-50 rounded-full dark:bg-gray-800 filter shadow hover:shadow-md dark:shadow-dark dark:hover:shadow-dark-lg hover:border-2 hover:border-gray-500 dark:hover:border-gray-300 z-10'}"
		>
			{#if dark}
				<Icon data="{faSun}" class="{'h-3 w-3 text-xs text-gray-700 dark:text-gray-100'}" scale="{1.5}" />
			{:else}
				<Icon data="{faMoon}" class="{'h-3 w-3 text-xs text-gray-700 dark:text-gray-100'}" scale="{1.5}" />
			{/if}
		</button>
	{/if}
</header>
