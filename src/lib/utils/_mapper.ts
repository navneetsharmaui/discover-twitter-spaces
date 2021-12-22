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
): ITwitterUserProfile[] => {
	return value.map((item) => ({
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
};

export const mapToSpaces = (value: ISpacesResponse[]): ITwitterSpace[] => {
	return value.map((space) => ({
		spaceId: space.id,
		title: !space.title ? '' : space.title,
		description: '',
		state: space.state,
		creatorId: space.creator_id,
		hostIds:
			space.host_ids && space.host_ids.length > 0
				? space.host_ids.some((id) => space.creator_id === id)
					? space.host_ids
					: [space.creator_id, ...space.host_ids]
				: [space.creator_id],
		scheduledStartTime:
			space.state.toLowerCase() === 'scheduled'
				? humanReadableTime(space.scheduled_start)
				: '',
		isLive: space.state.toLowerCase() === 'live',
		hosts: [],
	}));
};

export const mapToTwitterSpaces = (value: ISpacesMetaResponse): TwitterSpace[] => {
	const twitterSpaces = value;
	return twitterSpaces.meta.result_count !== 0
		? mapToSpaces(twitterSpaces.data).map((space) => {
				const mappedUsers = mapToTwitterUserProfile(twitterSpaces.includes.users);

				const hosts =
					space.hostIds.length > 0
						? space.hostIds
								.filter((id) => mappedUsers.some((user) => user.id === id))
								.map((hostId) => mappedUsers.find((user) => user.id === hostId))
						: [];
				return new TwitterSpace().deserialize({
					...space,
					hosts: hosts ? [...hosts] : [],
					title:
						space.title.length > 0
							? space.title
							: hosts.length > 0 && hosts[0]
							? `${hosts[0].name}'s Space`
							: 'Space',
				});
		  })
		: [];
};
