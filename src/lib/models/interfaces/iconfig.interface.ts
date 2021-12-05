import type { EnvironmentName, EnvironmentType } from '../enums';

export interface IConfig {
	launchURL: string;
	environmentType: EnvironmentType;
	production: boolean;
	isDebugMode: boolean;
	name: EnvironmentName;
}
