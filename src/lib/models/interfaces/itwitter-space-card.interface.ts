export interface ITwitterUser {
	name: string;
	id: string;
	imageUrl: string;
	profileUrl: string;
}
export interface ITwitterSpaceCard {
	spaceId: string;
	title: string;
	hosts: ITwitterUser[];
	description: string;
	state: string;
	scheduledStartTime: string;
	spaceUrl: string;
}
