<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { SPACE_CATEGORIES } from '$lib/data/spaces-categories';

	const dispatch = createEventDispatcher();

	export let searchValue = '';
	let selectedValue = 'category';

	const handleSearch = async (): Promise<void> => {
		if (searchValue.length >= 3) {
			selectedValue = 'category';
		}
	};

	const handlerSelection = async (): Promise<void> => {
		if (
			selectedValue.length >= 3 &&
			selectedValue !== searchValue &&
			selectedValue !== 'category'
		) {
			searchValue = '';
		}
	};

	const onDispatchSearchField = (input: string): void => {
		dispatch('submitSearchField', input);
	};

	const onSubmit = async (): Promise<void> => {
		if (
			selectedValue.length >= 3 &&
			selectedValue !== searchValue &&
			selectedValue !== 'category'
		) {
			searchValue = '';
			onDispatchSearchField(selectedValue);
		} else if (searchValue.length >= 3) {
			selectedValue = 'category';
			onDispatchSearchField(searchValue);
		}
	};
</script>

<div class="flex flex-col mb-4 w-full">
	<div class="relative w-full mb-2">
		<input
			bind:value="{searchValue}"
			on:input="{() => handleSearch()}"
			aria-label="Search articles"
			type="text"
			placeholder="Search Twitter Spaces"
			class="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-yellow-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
		/>
		<svg
			class="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="{2}"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
		</svg>
	</div>

	<div class="w-full flex flex-row justify-center items-center text-black dark:text-white mb-2">
		<p> -- OR -- </p>
	</div>

	<div class="w-full mb-4">
		<label class="block" for="category">
			<select
				class="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-yellow-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
				name="category"
				id="category"
				bind:value="{selectedValue}"
				on:change="{() => handlerSelection()}"
			>
				{#each SPACE_CATEGORIES as category, index (category.id)}
					<option value="{category.id}">{category.label}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="w-full mb-4">
		<button
			on:click="{() => onSubmit()}"
			type="button"
			class="w-full bg-gray-300 hover:bg-gray-400 text-black active:bg-gray-400 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
		>
			Submit
		</button>
	</div>
</div>
