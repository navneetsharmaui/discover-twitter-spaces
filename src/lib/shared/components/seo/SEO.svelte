<script lang="ts">
	import { discoverEnvironmentFacade } from '$core/services/_environment.facade';

	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';

	// Start: Exported Properties
	export let metaData!: Partial<IMetaTagProperties>;
	// End: Exported Properties

	const BASE_URL = discoverEnvironmentFacade.launchURL
		? discoverEnvironmentFacade.launchURL
		: 'https://discover-twitter-spaces.vercel.app';

	metaData = {
		...metaData,
		url: metaData.url && metaData.url !== '/' ? `${BASE_URL}${metaData.url}/` : `${BASE_URL}/`,
		robots: 'index,follow',
		openGraph: {
			...metaData.openGraph,
			url: metaData.url ? `${BASE_URL}${metaData.url}/` : `${BASE_URL}/`,
			title: metaData.title,
			description: metaData.description,
			locale: 'en_US',
			site_name: 'Discover Twitter Spaces',
		},
		twitter: {
			...metaData.twitter,
			title: metaData.title,
			description: metaData.description,
			card: 'summary_large_image',
			site: '@asnavneetsharma',
		},
	};
	if (metaData.searchUrl && metaData.searchUrl !== '/') {
		metaData.searchUrl = `${BASE_URL}${metaData.searchUrl}/`;
	} else if (metaData.url && metaData.url !== '/') {
		metaData.searchUrl = `${BASE_URL}${metaData.url}/`;
	} else {
		metaData.searchUrl = `${BASE_URL}/`;
	}
	const { isProd } = discoverEnvironmentFacade;
</script>

<svelte:head>
	<meta name="robots" content="{metaData.robots}" />
	<meta name="googlebot" content="{metaData.robots}" />

	{#if isProd}
		<link
			rel="sitemap"
			type="application/xml"
			title="Discover Twitter Spaces - Sitemap"
			href="{`${BASE_URL}/sitemap.xml`}"
		/>
	{/if}

	<link
		rel="search"
		type="application/opensearchdescription+xml"
		href="{`${BASE_URL}/opensearch.xml`}"
		title="Discover Twitter Spaces"
	/>

	{#if metaData && metaData.title}
		<title>{metaData.title}</title>
		<meta name="title" content="{metaData.title}" />
	{/if}

	{#if metaData && metaData.description}
		<meta name="description" content="{metaData.description}" />
	{/if}

	{#if metaData && metaData.keywords && metaData.keywords.length > 0}
		<meta name="keywords" content="{metaData.keywords.join(', ')}" />
	{/if}

	{#if metaData && metaData.keywords && metaData.keywords.length > 0}
		<meta name="news_keywords" content="{metaData.keywords.join(', ')}" />
	{/if}

	{#if metaData && metaData.url && BASE_URL}
		<link rel="canonical" href="{metaData.url}" />
	{/if}

	{#if metaData && metaData.twitter}
		<meta name="twitter:card" content="summary_large_image" />

		{#each Object.entries(metaData.twitter) as tag}
			{#if tag[0] && tag[1]}
				<meta name="twitter:{tag[0]}" content="{tag[1]}" />
			{/if}
		{/each}
	{/if}

	{#if metaData && metaData.openGraph}
		{#each Object.entries(metaData.openGraph) as tag}
			{#if tag[0] && tag[1]}
				<meta name="og:{tag[0]}" content="{tag[1]}" />
			{/if}
		{/each}
	{/if}
</svelte:head>
