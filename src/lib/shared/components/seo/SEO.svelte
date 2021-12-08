<script lang="ts">
	// Start: Local Imports
	// Models
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';

	// Data
	import { environment } from '$environment/environment';
	// End: Local Imports

	// Start: Exported Properties
	/**
	 * @type {IMetaTagProperties}
	 */
	export let metaData: Partial<IMetaTagProperties> = {};
	// End: Exported Properties

	const BASE_URL = environment.launchURL ? environment.launchURL : 'https://discover-twitter-spaces.vercel.app/';

	metaData = {
		...metaData,
		url: metaData.url && metaData.url !== '/' ? `${BASE_URL}${metaData.url}/` : `${BASE_URL}/`,
		searchUrl:
			metaData.searchUrl && metaData.searchUrl !== '/'
				? `${BASE_URL}${metaData.searchUrl}/`
				: metaData.url && metaData.url !== '/'
				? `${BASE_URL}${metaData.url}/`
				: `${BASE_URL}/`,
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

	const jsonLd = (content) => `<${'script'} type="application/ld+json">${JSON.stringify(content)}</${'script'}>`;

	$: {
		if (!!metaData.image && typeof metaData.image === 'string') {
			metaData.openGraph = {
				...metaData.openGraph,
				image: metaData.image.includes(BASE_URL) ? metaData.image : `${BASE_URL}${metaData.image}`,
				'image:alt': metaData.title,
			};
			metaData.twitter = {
				...metaData.twitter,
				image: metaData.image.includes(BASE_URL) ? metaData.image : `${BASE_URL}${metaData.image}`,
				'image:alt': metaData.title,
			};
		}
		if (typeof metaData.image === 'object') {
			metaData.openGraph = {
				...metaData.openGraph,
				image: `${BASE_URL}${metaData.image.url}`,
				'image:width': metaData.image.width,
				'image:height': metaData.image.height,
				'image:alt': metaData.image.alt || metaData.title,
			};
			metaData.twitter = {
				...metaData.twitter,
				image: `${BASE_URL}${metaData.image.url}`,
				'image:alt': metaData.image.alt || metaData.title,
			};
		}
	}
</script>

<svelte:head>
	<meta name="robots" content="{metaData.robots}" />
	<meta name="googlebot" content="{metaData.robots}" />

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

		{#each Object.keys(metaData.twitter) as tag}
			<meta name="twitter:{tag}" content="{metaData.twitter[tag]}" />
		{/each}
	{/if}

	{#if metaData && metaData.openGraph}
		{#each Object.keys(metaData.openGraph) as tag}
			<meta name="og:{tag}" content="{metaData.openGraph[tag]}" />
		{/each}
	{/if}

	{#if metaData && metaData.article && metaData.isArticle}
		{#each Object.keys(metaData.article) as tag}
			<meta name="article:{tag}" content="{metaData.article[tag]}" />
		{/each}
	{/if}

	{#if metaData && metaData.article && metaData.keywords && metaData.keywords.length > 0}
		{#each metaData.keywords as tag}
			<meta name="article:tag" content="{tag}" />
		{/each}
	{/if}

	{#if metaData && metaData.url}
		{@html jsonLd({
			'@context': 'https://schema.org',
			'@type': 'Organization',
			url: `${BASE_URL}/`,
			logo: {
				'@type': 'ImageObject',
				url: `${BASE_URL}/favicon.ico`,
			},
		})}
	{/if}

	{#if metaData && metaData.url && metaData.searchUrl && metaData.isArticle && metaData.article}
		{@html jsonLd({
			'@context': 'https://schema.org',
			'@type': 'NewsArticle',
			url: `${BASE_URL}/`,
			headling: metaData.title,
			image: [metaData.image && typeof metaData.image === 'object' ? metaData.image.url : metaData.image],
			datePublished: metaData.article.published_time,
			dateModified: metaData.article.modified_time,
			author: {
				'@type': 'Person',
				name: metaData.article.author,
			},
			publisher: {
				'@type': 'Organization',
				name: 'Discover Twitter Spaces',
				logo: {
					'@type': 'ImageObject',
					url: `${BASE_URL}/favicon.ico`,
				},
			},
			description: metaData.description,
			mainEntityOfPage: metaData.url,
			articleSection: 'Blog',
			keywords:
				metaData.keywords && metaData.keywords.length > 0 ? metaData.keywords.join(', ') : 'Discover Twitter Spaces',
		})}
	{/if}
</svelte:head>
