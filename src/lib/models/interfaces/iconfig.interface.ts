import type { EnvironmentName } from '../enums/environment-name.enum';
import type { EnvironmentType } from '../enums/environment-type.enum';

export interface IConfig {
	launchURL: string;
	environmentType: EnvironmentType;
	production: boolean;
	isDebugMode: boolean;
	name: EnvironmentName;
}
