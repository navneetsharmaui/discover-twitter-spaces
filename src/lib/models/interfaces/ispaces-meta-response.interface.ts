export interface ISpacesTwitterUserMetricResponse {
	followers_count: number;
	following_count: number;
	tweet_count: number;
	listed_count: number;
}

export interface ISpacesTwitterUserResponse {
	created_at: string;
	description: string;
	id: string;
	location: string;
	name: string;
	profile_image_url: string;
	protected: boolean;
	public_metrics: ISpacesTwitterUserMetricResponse;
	url: string;
	username: string;
	verified: boolean;
}

export interface ISpacesResponse {
	created_at: string;
	creator_id: string;
	host_ids: string[];
	id: string;
	invited_user_ids?: string[];
	is_ticketed: boolean;
	lang: string;
	participant_count: number;
	speaker_ids?: string[];
	started_at?: string;
	state: string;
	title: string;
	updated_at: string;

	scheduled_start?: string;
	topic_ids?: string[];
}

export interface ISpacesMetaResponse {
	data: ISpacesResponse[];
	includes: { users: ISpacesTwitterUserResponse[] };
	meta: {
		result_count: number;
	};
}
