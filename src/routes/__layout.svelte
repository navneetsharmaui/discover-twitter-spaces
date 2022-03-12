<script lang="ts">
	import '../styles/tailwind.css';
	import Header from '$ui/components/headers/Header.svelte';
</script>

<div class=" dark:bg-zinc-900 bg-gray-50 transition-colors duration-500 ease-in-out">
	<!-- Start: Header Navigation -->
	<Header />
	<!-- End: Header Navigation -->
	<main class="flex flex-col w-full justify-start items-center px-8 pt-4">
		<div class="max-w-2xl w-full md:min-w-2xl">
			<!-- Start: Defaull layout slot -->
			<slot />
			<!-- End: Defaull layout slot -->
		</div>
	</main>
</div>
