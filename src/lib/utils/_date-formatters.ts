function toDate(date: string | Date) {
	if (!date) return new Date();
	return typeof date === 'string' ? new Date(date) : date;
}

export function humanReadableTime(date: string | Date): string {
	return toDate(date).toLocaleTimeString(undefined, {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});
}
