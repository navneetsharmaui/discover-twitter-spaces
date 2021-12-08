export interface IDiscoverDBConfig<T> {
	apiKey?: string;
	defaultAPILang?: string;
	authName?: string;
	endPoints: T;
}
