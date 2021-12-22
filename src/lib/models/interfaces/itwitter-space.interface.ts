import type { ITwitterUserProfile } from './itwitter-user-profile.interface';

export interface ITwitterSpace {
	spaceId: string;
	title: string;
	creatorId: string;
	hostIds: string[];
	hosts: ITwitterUserProfile[];
	description: string;
	state: string;
	scheduledStartTime: string;
	isLive: boolean;
}
