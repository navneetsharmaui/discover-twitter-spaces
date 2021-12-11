<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let zIndex = 10000;
	export let action = 'hover';
	export let isPreventDefault = false;
	export let isStopPropagation = false;

	const dispatch = createEventDispatcher();

	const eventClick = (event: Event) => {
		if (isPreventDefault) event.preventDefault();
		if (isStopPropagation) event.stopPropagation();
		dispatch('setOpen', {});
	};

	const onClick = action === 'click' ? eventClick : null;
	const onTouchEnd = action === 'click' ? eventClick : null;
	const onMouseEnter = action === 'hover' ? eventClick : null;
</script>

<div
	id="overlay"
	class="fixed w-full h-full top-0 left-0 cursor-pointer"
	on:mouseenter="{onMouseEnter}"
	on:click="{onClick}"
	on:touchend="{onTouchEnd}"
	style="z-index: {zIndex};"></div>
