<script lang="ts">
	// Start: Local Imports
	// Components
	import SEO from '../seo/SEO.svelte';
	// Models
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	// End: Local Imports
	// Start: Exported Properties
	/**
	 * @type {IMetaTagProperties}
	 */
	export let metaData!: Partial<IMetaTagProperties>;
	// End: Exported Properties
</script>

<SEO metaData="{metaData}" />
