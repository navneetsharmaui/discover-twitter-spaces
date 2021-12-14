import type {
	ISpacesMetaResponse,
	ISpacesResponse,
	ISpacesTwitterUserResponse,
} from '$models/interfaces/ispaces-meta-response.interface';
import type {
	ITwitterSpace,
	ITwitterUserProfile,
} from '$models/interfaces/itwitter-space.interface';

import { humanReadableTime } from '$utils/_date-formatters';

export const mapToTwitterUserProfile = (
	value: ISpacesTwitterUserResponse[],
): ITwitterUserProfile[] => {
	return value.map((item) => ({
		name: item.name,
		id: item.id,
		imageUrl: item.profile_image_url,
		profileUrl: `https://twitter.com/${item.username}`,
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
		spaceUrl: `https://twitter.com/i/spaces/${space.id}`,
		hosts: [],
	}));
};

export const mapToTwitterSpaces = (value: ISpacesMetaResponse): ITwitterSpace[] => {
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
				return {
					...space,
					hosts: hosts ? [...hosts] : [],
					title:
						space.title.length > 0
							? space.title
							: hosts.length > 0 && hosts[0]
							? `${hosts[0].name}'s Space`
							: 'Space',
				};
		  })
		: [];
};
