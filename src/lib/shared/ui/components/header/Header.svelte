<script lang="ts">
	// Start: Local Imports

	// Models
	import type { IHeaderNavLink } from '$models/interfaces/iheader-nav-link.interface';
	import type { IModernImage } from '$models/interfaces/imodern-image.interface';

	// Components
	import { NavigationProgressBar } from '$ui/components/navigation-progress-bar';
	import { NavigationBar } from '$ui/components/navigation-bar';
	// End: Local Imports

	// Start: Exported Properties
	export let useTitleAndLogo!: boolean;
	export let useThemeModeButton!: boolean;

	/**
	 * @type {IHeaderNavLink}
	 */
	export let navLinks!: IHeaderNavLink[];
	// End: Exported Properties

	// Local properties
</script>

<!-- Start: Navigation Progress bar -->
<NavigationProgressBar />
<!-- End: Navigation Progress bar -->

<!-- Start: Navigation bar -->
<NavigationBar
	navLinks="{navLinks}"
	useThemeModeButton="{useThemeModeButton}"
	useTitleAndLogo="{useTitleAndLogo}"
	on:toggleTheme
/>
<!-- End: Navigation bar -->
