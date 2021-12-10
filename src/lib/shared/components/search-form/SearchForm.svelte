<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { SPACE_CATEGORIES } from '$lib/data/spaces-categories';

	const dispatch = createEventDispatcher();

	export let searchValue = '';
	let selectedValue = 'category';

	$: isSubmitDisabled =
		selectedValue === 'category' && (searchValue === '' || searchValue.length <= 2);

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
			class="form-input"
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
		<label class="inline-block relative w-full" for="category">
			<select
				class="form-input appearance-none"
				name="category"
				id="category"
				bind:value="{selectedValue}"
				on:change="{() => handlerSelection()}"
			>
				{#each SPACE_CATEGORIES as category, index (category.id)}
					<option value="{category.id}">{category.label}</option>
				{/each}
			</select>
			<div
				class="absolute inset-y-0 right-0 top-1.5 flex items-center px-3 py-2 pointer-events-none"
			>
				<svg class="w-4 h-4 fill-current text-black dark:text-white" viewBox="0 0 20 20"
					><path
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
						fill-rule="evenodd"></path></svg
				>
			</div>
		</label>
	</div>

	<div class="w-full mb-4">
		<button
			aria-label="Search Twitter Spaces Submit Button"
			title="Search Twitter Spaces Submit Button. Type in the search field to search for a space or select a category to search for spaces in that category."
			on:click="{() => onSubmit()}"
			disabled="{isSubmitDisabled}"
			type="button"
			class="w-full bg-indigo-500 hover:bg-indigo-800 disabled:bg-gray-200 disabled:shadow-none disabled:text-black text-white active:-indigo-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
		>
			Submit
		</button>
	</div>
</div>
