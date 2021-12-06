<script lang="ts">
	import Icon from 'svelte-awesome';
	import {
		faReddit,
		faTwitter,
		faFacebookSquare,
		faLinkedin,
		faFlipboard,
		faWhatsappSquare,
	} from '@fortawesome/free-brands-svg-icons';
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';

	// Exports
	export let url!: string;
	export let title!: string;
	export let description!: string;
	export let isVertical = false;

	// Local Properties

	const encodedURL = encodeURIComponent(url);
	const encodedTitle = encodeURIComponent(title);
	const encodedDescription = encodeURIComponent(description);

	const linkStyles =
		'hover:drop-shadow-lg dark:hover:shadow-dark-lg inline-flex text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-400';
</script>

<ExternalLink
	href="{`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`}"
	cssClasses="{linkStyles}{isVertical ? ' mb-6' : ' mr-1 md:mr-3'}"
	ariaLabel="{`Share ${title} on Twitter`}"
>
	<Icon data="{faTwitter}" scale="{1.5}" />
</ExternalLink>
<ExternalLink
	href="{`https://www.reddit.com/submit?url=${encodedURL}&title=${encodedTitle}`}"
	cssClasses="{linkStyles}{isVertical ? ' my-6' : ' mx-1 md:mx-3'}"
	ariaLabel="{`Share ${title} on Reddit`}"
>
	<Icon data="{faReddit}" scale="{1.5}" />
</ExternalLink>
<ExternalLink
	href="{`https:///api.whatsapp.com/send?text=${encodedURL}`}"
	cssClasses="{linkStyles} {isVertical ? ' my-6' : ' mx-1 md:mx-3'}"
	ariaLabel="{`Share ${title} on Whatsapp`}"
>
	<Icon data="{faWhatsappSquare}" scale="{1.5}" />
</ExternalLink>
<ExternalLink
	href="{`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}"
	cssClasses="{linkStyles}{isVertical ? ' my-6' : ' mx-1 md:mx-3'}"
	ariaLabel="{`Share ${title} on Facebook`}"
>
	<Icon data="{faFacebookSquare}" scale="{1.5}" />
</ExternalLink>
<ExternalLink
	href="{`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedTitle}&summary=${encodedDescription}&source=LinkedIn`}"
	cssClasses="{linkStyles}{isVertical ? ' my-6' : ' mx-1 md:mx-3'}"
	ariaLabel="{`Share ${title} on LinkedIn`}"
>
	<Icon data="{faLinkedin}" scale="{1.5}" />
</ExternalLink>
<ExternalLink
	href="{`https://share.flipboard.com/bookmarklet/popout?v=2&url=${encodedURL}`}"
	cssClasses="{linkStyles}{isVertical ? ' my-6' : ' mx-1 md:mx-3'}"
	ariaLabel="{`Share ${title} on Flipboard`}"
>
	<Icon data="{faFlipboard}" scale="{1.5}" />
</ExternalLink>
<ExternalLink
	href="{`mailto:?subject=${title}&body=Check out this post. ${description} ${url}`}"
	cssClasses="{linkStyles}{isVertical ? ' my-6' : ' mx-1 md:mx-3'}"
	ariaLabel="{`Share ${title} on Email`}"
>
	<Icon data="{faEnvelope}" scale="{1.5}" />
</ExternalLink>
