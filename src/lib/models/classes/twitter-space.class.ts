import type { IDeserializable } from '$models/interfaces/ideserializable.interface';
import type { ITwitterSpace } from '$models/interfaces/itwitter-space.interface';
import { TwitterUserProfile } from './twitter-user-profile.class';

export class TwitterSpace implements IDeserializable<ITwitterSpace>, ITwitterSpace {
	public spaceId: string;

	public title: string;

	public creatorId: string;

	public hostIds: string[];

	public hosts: TwitterUserProfile[];

	public description: string;

	public state: string;

	public scheduledStartTime: string;

	public isLive: boolean;

	deserialize(input: ITwitterSpace): this {
		Object.assign(this, input);
		this.hosts = input.hosts.map((host) => new TwitterUserProfile().deserialize(host));
		return this;
	}

	public get spaceUrl(): string {
		return `https://twitter.com/i/spaces/${this.spaceId}`;
	}
}
