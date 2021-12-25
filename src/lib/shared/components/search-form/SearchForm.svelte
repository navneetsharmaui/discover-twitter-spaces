<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import SelectOption from '$components/select-option/SelectOption.svelte';
	import { SPACE_CATEGORIES } from '$data/spaces-categories';
	import type { ISelectionOption } from '$models/interfaces/iselection-option.interface';

	const dispatch = createEventDispatcher();

	export let searchValue = '';

	const DEFAULT_SELECTION: ISelectionOption = {
		value: 'category',
		label: 'Select a category',
		id: 'category',
	};

	let selectedValue: ISelectionOption = {
		...DEFAULT_SELECTION,
	};

	const selectOptions: ISelectionOption[] = SPACE_CATEGORIES.map((category) => ({
		id: category.id,
		label: category.label,
		value: category.id,
	}));

	let isSubmitDisabled = true;

	$: isSubmitDisabled =
		selectedValue.value === 'category' && (searchValue === '' || searchValue.length <= 2);

	const handleSearch = () => {
		if (searchValue.length >= 3) {
			selectedValue = {
				...DEFAULT_SELECTION,
			};
		}
	};

	const handleSelection = (event: CustomEvent<ISelectionOption>) => {
		if (
			event.detail.value.length >= 3 &&
			event.detail.value !== searchValue &&
			event.detail.value !== 'category'
		) {
			searchValue = '';
			selectedValue = {
				...event.detail,
			};
		} else if (event.detail.value === 'category') {
			selectedValue = {
				...DEFAULT_SELECTION,
			};
		}
	};

	const onDispatchSearchField = (input: string): void => {
		dispatch('submitSearchField', input);
	};

	const onSubmit = () => {
		if (
			selectedValue.value.length >= 3 &&
			selectedValue.value !== searchValue &&
			selectedValue.value !== 'category'
		) {
			searchValue = '';
			onDispatchSearchField(selectedValue.value);
		} else if (searchValue.length >= 3) {
			selectedValue = {
				...DEFAULT_SELECTION,
			};
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
			class="absolute right-3 top-3 h-5 w-5 text-black dark:text-white"
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
		<SelectOption
			selectOptions="{selectOptions}"
			selectedValue="{selectedValue}"
			on:selection="{(e) => handleSelection(e)}"
		/>
	</div>

	<div class="w-full mb-4">
		<button
			aria-label="Search Twitter Spaces Submit Button"
			title="Search Twitter Spaces Submit Button. Type in the search field to search for a space or select a category to search for spaces in that category."
			on:click="{() => onSubmit()}"
			disabled="{isSubmitDisabled}"
			type="button"
			class="w-full bg-indigo-700 hover:bg-indigo-800 disabled:bg-gray-200 disabled:shadow-none disabled:text-black text-white active:-indigo-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
		>
			Submit
		</button>
	</div>
</div>
