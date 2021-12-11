<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let zIndex = 1000;

	const dispatch = createEventDispatcher();

	const eventClick = () => {
		dispatch('setOpen', {});
	};

	const onMouseEnter = eventClick;
</script>

<div
	id="overlay"
	class="fixed w-full h-full top-0 left-0 cursor-pointer"
	on:mouseenter="{onMouseEnter}"
	style="z-index: {zIndex};"></div>
