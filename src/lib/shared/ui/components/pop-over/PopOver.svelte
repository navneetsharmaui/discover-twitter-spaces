<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Content from './Content.svelte';

	const zIndex = 1000;

	let isOpen = false;

	let targetDomReference: HTMLElement;

	const dispatch = createEventDispatcher();
	const onOpen = () => {
		dispatch('open');
	};
	const setOpen = () => {
		isOpen = !isOpen;
		if (!isOpen) {
			dispatch('close');
		}
	};
	const eventMouseOut = ({ relatedTarget }: { relatedTarget: any }) => {
		if (relatedTarget.id === 'overlay' && !isOpen) {
			setOpen();
		}
	};
	const setOpenTrue = () => {
		isOpen = true;
		return isOpen;
	};
	const onMouseOver = setOpenTrue;
	const onMouseOut = eventMouseOut;
</script>

<div class="relative">
	<div
		bind:this="{targetDomReference}"
		class="inline-block relative"
		style="{isOpen ? `z-index: ${zIndex + 10}` : ''}"
		on:mouseover="{onMouseOver}"
		on:focus="{onMouseOver}"
		on:mouseout="{onMouseOut}"
		on:blur="{onMouseOut}"
	>
		<slot name="target" open="{isOpen}" />
	</div>
	{#if isOpen}
		<Content
			on:open="{onOpen}"
			on:setOpen="{setOpen}"
			targetDomReference="{targetDomReference}"
			zIndex="{zIndex}"
		>
			<slot name="content" open="{isOpen}" />
		</Content>
	{/if}
</div>
