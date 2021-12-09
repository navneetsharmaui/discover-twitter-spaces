<script lang="ts">
	import { blur } from 'svelte/transition';

	export let referesh = '';
</script>

{#key referesh}
	<span in:blur="{{ duration: 200, delay: 200, amount: 5 }}" out:blur="{{ duration: 200 }}">
		<slot />
	</span>
{/key}
