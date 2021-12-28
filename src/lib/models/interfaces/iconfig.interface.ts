import type { EnvironmentName } from '$models/enums/environment-name.enum';
import type { EnvironmentType } from '$models/enums/environment-type.enum';

export interface IConfig {
	launchURL: string;
	environmentType: EnvironmentType;
	production: boolean;
	isDebugMode: boolean;
	name: EnvironmentName;
}
