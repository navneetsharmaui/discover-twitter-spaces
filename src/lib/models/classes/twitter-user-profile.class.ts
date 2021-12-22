import type { IDeserializable } from '../interfaces/ideserializable.interface';
import type { ITwitterUserProfile } from '../interfaces/itwitter-user-profile.interface';

export class TwitterUserProfile
	implements IDeserializable<ITwitterUserProfile>, ITwitterUserProfile
{
	public name: string;
	public id: string;
	public imageUrl: string;
	public username: string;
	public followersCount: number;
	public followingCount: number;
	public description: string;

	deserialize(input: ITwitterUserProfile): this {
		Object.assign(this, input);
		return this;
	}

	public get profileUrl(): string {
		return `https://twitter.com/${this.username}`;
	}
}
