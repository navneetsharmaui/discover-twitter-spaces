/**
 * This function checks if the object of given type is null or undefined. If so, it throws an error.
 * It asserts that the object is not null or undefined for functions that accepts the optional or partial values.
 */
export const assertHelper = <T, U extends () => void>(
	condition: T,
	callback: U,
): asserts condition is Exclude<T, null | undefined> => {
	if (condition === null || condition === undefined) {
		callback();
	}
};
