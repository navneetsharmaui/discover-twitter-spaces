import type {
	ISpacesMetaResponse,
	ISpacesResponse,
	ISpacesTwitterUserResponse,
} from '$models/interfaces/ispaces-meta-response.interface';
import type { ITwitterUserProfile } from '$models/interfaces/itwitter-user-profile.interface';
import type { ITwitterSpace } from '$models/interfaces/itwitter-space.interface';
import { TwitterSpace } from '$models/classes/twitter-space.class';

import { humanReadableTime } from '$utils/_date-formatters';

export const mapToTwitterUserProfile = (
	value: ISpacesTwitterUserResponse[],
): ITwitterUserProfile[] =>
	value.map((item) => ({
		name: item.name,
		id: item.id,
		imageUrl: item.profile_image_url,
		username: item.username,
		followersCount:
			item.public_metrics && item.public_metrics.followers_count
				? item.public_metrics.followers_count
				: 0,
		followingCount:
			item.public_metrics && item.public_metrics.following_count
				? item.public_metrics.following_count
				: 0,
		description: item.description || '',
	}));

export const mapToSpaces = (value: ISpacesResponse[]): ITwitterSpace[] =>
	value.map((space) => {
		const twitterSpace: ITwitterSpace = {
			spaceId: space.id,
			title: !space.title ? '' : space.title,
			description: '',
			state: space.state,
			creatorId: space.creator_id,
			hostIds: [],
			scheduledStartTime:
				space.state.toLowerCase() === 'scheduled'
					? humanReadableTime(space?.scheduled_start || '')
					: '',
			isLive: space.state.toLowerCase() === 'live',
			hosts: [],
		};

		if (space.host_ids && space.host_ids.length > 0) {
			if (space.host_ids.some((id) => space.creator_id === id)) {
				twitterSpace.hostIds = [...space.host_ids];
			} else {
				twitterSpace.hostIds = [space.creator_id, ...space.host_ids];
			}
		} else {
			twitterSpace.hostIds = [space.creator_id];
		}
		return twitterSpace;
	});

export const mapToTwitterSpaces = (twitterSpaces: ISpacesMetaResponse): TwitterSpace[] =>
	twitterSpaces.meta.result_count !== 0
		? mapToSpaces(twitterSpaces.data).map((space) => {
				const mappedUsers = mapToTwitterUserProfile(twitterSpaces.includes.users);

				const hosts: ITwitterUserProfile[] =
					space.hostIds.length > 0
						? space.hostIds
								.filter((id) => mappedUsers.some((user) => user.id === id))
								.map((hostId) => {
									const userIndex = mappedUsers.findIndex(
										(user) => user.id === hostId,
									);
									return mappedUsers[userIndex];
								})
						: [];

				const twitterSpace: ITwitterSpace = {
					...space,
					hosts: hosts ? [...hosts] : [],
				};

				if (space.title.length > 0) {
					twitterSpace.title = space.title;
				} else if (hosts.length > 0 && hosts[0]) {
					twitterSpace.title = `${hosts[0].name}'s Space`;
				} else {
					twitterSpace.title = 'Space';
				}
				return new TwitterSpace().deserialize({ ...twitterSpace });
		  })
		: [];
