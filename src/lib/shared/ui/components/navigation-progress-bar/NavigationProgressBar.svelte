<script lang="ts">
	// Svelte Imports
	import { navigating } from '$app/stores';
	import { browser } from '$app/env';

	// Third party imports
	import NProgress from 'nprogress';

	NProgress.configure({
		showSpinner: false,
	});

	$: if (browser) {
		$navigating ? NProgress.start() : NProgress.done();
	}
</script>
