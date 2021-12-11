export interface ITwitterUserProfile {
	name: string;
	id: string;
	imageUrl: string;
	profileUrl: string;
	followersCount: number;
	followingCount: number;
	description: string;
}
export interface ITwitterSpace {
	spaceId: string;
	title: string;
	creatorId: string;
	hostIds: string[];
	hosts: ITwitterUserProfile[];
	description: string;
	state: string;
	scheduledStartTime: string;
	spaceUrl: string;
	isLive: boolean;
}
