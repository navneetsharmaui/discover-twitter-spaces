<script lang="ts">
	import Content from './Content.svelte';
	import { createEventDispatcher } from 'svelte';

	const DEFAULT_ZINDEX = 10000;
	export let action = 'hover';
	export let zIndex = DEFAULT_ZINDEX;
	export let isArrow = true;
	export let placement = 'auto';
	export let preventDefault = false;
	export let stopPropagation = false;
	export let isOpen = false;

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
	const eventClick = (event: Event) => {
		if (preventDefault) event.preventDefault();
		if (stopPropagation) event.stopPropagation();
		setOpen();
	};
	const eventMouseOut = ({ relatedTarget }) => {
		if (relatedTarget.id === 'overlay' && !isOpen) {
			setOpen();
		}
	};
	const onTouchEnd = action === 'click' ? eventClick : null;
	const onClick = action === 'click' ? eventClick : null;
	const setOpenTrue = () => (isOpen = true);
	const onMouseOver = action === 'hover' ? setOpenTrue : null;
	const onMouseOut = action === 'hover' ? eventMouseOut : null;
</script>

<div class="relative">
	<div
		bind:this="{targetDomReference}"
		class="inline-block relative"
		style="{isOpen ? `z-index: ${zIndex + 10}` : ''}"
		on:click="{onClick}"
		on:touchend="{onTouchEnd}"
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
			placement="{placement}"
			targetDomReference="{targetDomReference}"
			zIndex="{zIndex}"
			isArrow="{isArrow}"
			action="{action}"
			isPreventDefault="{preventDefault}"
			isStopPropagation="{stopPropagation}"
		>
			<slot name="content" open="{isOpen}" />
		</Content>
	{/if}
</div>
