<script lang="ts">
	import type { ISelectionOption } from '$models/interfaces/iselection-option.interface';

	import { createEventDispatcher } from 'svelte';

	export let selectOptions!: ISelectionOption[];
	export let selectedValue!: ISelectionOption;

	const dispatch = createEventDispatcher();

	let isOptionsListOpen = false;

	const handleSelection = (selectedOption: ISelectionOption) => {
		isOptionsListOpen = false;
		dispatch('selection', selectedOption);
	};

	const openOptionsList = () => {
		isOptionsListOpen = !isOptionsListOpen;
	};
</script>

<div class="relative">
	<button
		type="button"
		class="relative cursor-pointer rounded-full shadow dark:shadow pl-3 pr-10 py-2 mt-1 block w-full bg-white border dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-sm dark:text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none"
		aria-label="Select a option"
		on:click="{() => openOptionsList()}"
	>
		<span class="flex items-center">
			<span class="ml-3 block truncate"> {selectedValue.label} </span>
		</span>
		<span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
			<svg
				class="h-5 w-5 text-black dark:text-white"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
					clip-rule="evenodd"></path>
			</svg>
		</span>
	</button>

	{#if isOptionsListOpen}
		<ul
			class="absolute z-[100] mt-1 w-full bg-white dark:bg-zinc-800 shadow-lg rounded-xl py-1 text-base ring-1 ring-black  ring-opacity-5 focus:outline-none sm:text-sm overflow-hidden"
			tabindex="-1"
			aria-label="option"
		>
			{#each selectOptions as option, index (option.id)}
				<li
					class="text-black dark:text-white bg-white dark:bg-zinc-800 cursor-pointer select-none relative py-1.5 pl-3 pr-9"
					role="option"
					on:click="{() => handleSelection(option)}"
				>
					<div class="flex items-center">
						<span class="font-normal hover:font-bold ml-3 block truncate">
							{option.label}
						</span>
					</div>
					{#if selectedValue.id === option.id}
						<span
							class="text-indigo-800 absolute inset-y-0 right-0 flex items-center pr-4"
						>
							<svg
								class="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"></path>
							</svg>
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>
