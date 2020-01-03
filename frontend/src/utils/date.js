import {format, parseISO} from 'date-fns';

export function formatDateTime(date) {
	if (typeof date === 'string') {
		date = parseISO(date);
	}
	return format(date, 'd.M.yyyy H:mm');
}

export function formatDate(date) {
	if (typeof date === 'string') {
		date = parseISO(date);
	}
	return format(date, 'd. M. yyyy');
}
