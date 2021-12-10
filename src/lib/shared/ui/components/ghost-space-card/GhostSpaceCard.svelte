<style lang="postcss">
	@keyframes placeHolderShimmer {
		0% {
			background-position: -468px 0;
		}
		100% {
			background-position: 468px 0;
		}
	}

	.ghost-loader-background {
		animation-duration: 1.25s;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
		animation-name: placeHolderShimmer;
		animation-timing-function: linear;
		@apply bg-gray-400;
		background: linear-gradient(to right, #d4d4d4 10%, #b3b2b2 18%, #d4d4d4 33%);
		background-size: 800px 104px;
		height: 100%;
		position: relative;
	}
</style>

<script>
	import Card from '$ui/components/card/Card.svelte';
</script>

<Card>
	<div class="flex flex-col w-full overflow-hidden">
		<div class="flex flex-col justify-start items-start mb-3">
			<div class="block w-3/4 h-6"><div class="ghost-loader-background rounded"></div></div>
			<div class="flex flex-row mt-3 w-full">
				<div class="block w-2 h-2"
					><div class="ghost-loader-background rounded-full"></div></div
				>
				<div class="block w-1/3 h-2"
					><div class="ghost-loader-background rounded ml-1"></div></div
				>
			</div>
		</div>
		<div class="flex flex-col my-3">
			<div class="mb-2 overflow-hidden">
				<small class="block w-16 h-3"
					><div class="ghost-loader-background rounded"></div></small
				>
			</div>
			<div class="flex flex-row flex-wrap w-full overflow-hidden gap-4">
				<div class="block min-w-4xs h-8 my-2">
					<div class="ghost-loader-background rounded-full">
						<div class="block h-8 w-8 rounded-full border-gray-200 border-2"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-row mt-3">
			<div class="h-8 w-28"><div class="ghost-loader-background rounded"></div></div>
		</div>
	</div>
</Card>
