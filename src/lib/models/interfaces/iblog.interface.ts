export interface IBlog {
	layout: string;
	slug: string;
	title: string;
	author: string;
	published: boolean;
	tags: string[];
	banner?: string[];
	bannerCredit?: string;
	canonical?: string;
	date: string;
	description: string;
	edit?: string;
	modified?: string;
	authorImages: string[];
	authorSocialMediaLink: string;
	bannerImageDescription: string;
	bannerImageCredit: string;
	shareImage: string;
	nextArticleUrl?: string;
	previousArticleUrl?: string;
}
