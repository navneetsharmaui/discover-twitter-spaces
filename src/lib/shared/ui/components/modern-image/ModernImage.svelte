<script lang="ts">
	import type { IModernImage } from '$models/interfaces/imodern-image.interface';

	export let modernImages!: IModernImage[];

	$: indexImage = modernImages.find((x) => x.isIndexImage);
</script>

<picture>
	{#each modernImages as modernImage, index (modernImage.imageUrl)}
		<source
			srcset="{modernImage.imageUrl}"
			type="{modernImage.imageType}"
			width="{modernImage.imageWidth}"
			height="{modernImage.imageHeight}"
		/>
	{/each}
	{#if indexImage.isCrossOrigin}
		<img
			class="{indexImage.css}"
			alt="{indexImage.imageAlt}"
			aria-label="{indexImage.imageAlt}"
			loading="eager"
			decoding="async"
			width="{indexImage.imageWidth}"
			height="{indexImage.imageHeight}"
			src="{indexImage.imageUrl}"
			crossorigin="{indexImage.crossOrigin ? indexImage.crossOrigin : 'anonymous'}"
		/>
	{:else}
		<img
			class="{indexImage.css}"
			alt="{indexImage.imageAlt}"
			aria-label="{indexImage.imageAlt}"
			loading="eager"
			decoding="async"
			width="{indexImage.imageWidth}"
			height="{indexImage.imageHeight}"
			src="{indexImage.imageUrl}"
		/>
	{/if}
</picture>
