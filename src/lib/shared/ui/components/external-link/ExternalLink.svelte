<script lang="ts">
	export let href!: string;
	export let ariaLabel!: string;
	export let cssClasses =
		'text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-500 transition';
</script>

<a
	href="{href}"
	class="{cssClasses}"
	target="_blank"
	rel="noopener noreferrer"
	aria-label="{ariaLabel}"
	data-link="{href}"
	title="{ariaLabel}"
>
	<slot />
</a>
