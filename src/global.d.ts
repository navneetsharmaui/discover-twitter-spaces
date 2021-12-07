/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

// Modules

/**
 * With these declarations images can be imported in the components.
 *
 * @example
 * ```svelte
 * 	<script lang=ts>
 * 		import logo from 'static/images/logo.svg';
 * 	</script>
 *
 * 	<img src="{logo}" />
 * ```
 */
declare module '*.gif' {
	const value: string;
	export = value;
}

declare module '*.jpg' {
	const value: string;
	export = value;
}

declare module '*.jpeg' {
	const value: string;
	export = value;
}

declare module '*.png' {
	const value: string;
	export = value;
}

declare module '*.JPG' {
	const value: string;
	export = value;
}

declare module '*.JPEG' {
	const value: string;
	export = value;
}

declare module '*.PNG' {
	const value: string;
	export = value;
}

declare module '*.svg' {
	const value: string;
	export = value;
}

declare module '*.wbep' {
	const value: string;
	export = value;
}

declare module 'svelte-awesome';

// Start: Interfaces

interface Locals {
	userid: string;
}

interface ImportMetaEnv {
	DISCOVER_BLOG_BASE_URL: string;
	DISCOVER_TWITTER_TOKEN: string;
	DISCOVER_TWITTER_BASE_API_URL: string;
	DISCOVER_TWITTER_PROFILE_URL: string;
	DISCOVER_GITHUB_REPO_URL: string;
}
