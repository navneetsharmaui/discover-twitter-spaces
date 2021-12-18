<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import GhostSpaceCard from '$ui/components/ghost-space-card/GhostSpaceCard.svelte';
</script>

<Meta title="UI/GhostSpaceCard" component="{GhostSpaceCard}" />

<Template let:args>
	<GhostSpaceCard />
</Template>

<Story name="Content Loading" />
