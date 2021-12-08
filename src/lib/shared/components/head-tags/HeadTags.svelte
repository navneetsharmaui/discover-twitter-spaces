<script lang="ts">
	// Start: Local Imports
	// Components
	import SEO from '../seo/SEO.svelte';
	// Models
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	// End: Local Imports

	const description =
		'Discover twitter spaces and get the latest news from the world of twitter. Join the conversation and get the latest news from the world of twitter.';

	// Start: Exported Properties
	/**
	 * @type {IMetaTagProperties}
	 */
	export let metaData: Partial<IMetaTagProperties> = {};
	// End: Exported Properties

	metaData = {
		title: metaData.title ? metaData.title : 'Discover Twitter Spaces',
		description: metaData.description ? metaData.description : description,
		...metaData,
	};
</script>

<SEO metaData="{metaData}" />
