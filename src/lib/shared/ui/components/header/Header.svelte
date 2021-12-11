<script lang="ts">
	// Start: Local Imports

	// Models
	import type { IHeaderNavLink } from '$models/interfaces/iheader-nav-link.interface';

	// Components
	import { NavigationProgressBar } from '$ui/components/navigation-progress-bar';
	import { NavigationBar } from '$ui/components/navigation-bar';
	// End: Local Imports

	// Start: Exported Properties
	export let gitHubLink!: string;
	export let twitterLink!: string;

	// End: Exported Properties

	// Local properties
</script>

<!-- Start: Navigation Progress bar -->
<NavigationProgressBar />
<!-- End: Navigation Progress bar -->

<!-- Start: Navigation bar -->
<NavigationBar gitHubLink="{gitHubLink}" twitterLink="{twitterLink}" on:toggleTheme />
<!-- End: Navigation bar -->
