import type { EndpointOutput } from '@sveltejs/kit';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';

export const debounce = (
	func: (value: string) => Promise<EndpointOutput<DefaultBody>>,
	wait: number,
	immediate = false,
): ((...args: unknown[]) => void) => {
	let timeout: NodeJS.Timeout;
	return (...args: unknown[]): void => {
		const later = () => {
			timeout = null;
			if (!immediate) func.apply(this, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(this, args);
	};
};
