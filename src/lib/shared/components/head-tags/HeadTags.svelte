<script lang="ts">
	// Start: Local Imports
	// Components
	import SEO from '../seo/SEO.svelte';
	// Models
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	// End: Local Imports

	const description = 'Slice of my world for eveyone on web. Here you can see projects I made and blogs I wrote.';

	// Start: Exported Properties
	/**
	 * @type {IMetaTagProperties}
	 */
	export let metaData: Partial<IMetaTagProperties> = {};
	// End: Exported Properties

	metaData = {
		title: metaData.title ? metaData.title : 'Navneet Sharma',
		description: metaData.description ? metaData.description : description,
		...metaData,
	};
</script>

<SEO metaData="{metaData}" />
