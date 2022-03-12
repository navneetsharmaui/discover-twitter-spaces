/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		userid: string;
	}

	// interface Platform {}

	// interface Session {}

	// interface Stuff {}
}

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

// Start: Interfaces

interface ImportMetaEnv {
	readonly DISCOVER_BASE_URL: string;
	readonly DISCOVER_TWITTER_BASE_API_URL: string;
	readonly DISCOVER_TWITTER_PROFILE_URL: string;
	readonly DISCOVER_GITHUB_REPO_URL: string;
	readonly DISCOVER_UPSTASH_REDIS_REST_URL: string;
	readonly DISCOVER_UPSTASH_REDIS_REST_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
