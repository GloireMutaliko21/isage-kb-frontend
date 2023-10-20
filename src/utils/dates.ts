import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import fr from 'dayjs/locale/fr';

export const currDate = dayjs();

export const lastMonthYearAndMont = () => {
	const date = new Date(currDate.subtract(0, 'month').toISOString());
	return { year: date.getFullYear(), month: date.getMonth() };
};

export const lastSixMonths = () => {
	const start = new Date(currDate.subtract(6, 'month').toISOString());
	const end = new Date(currDate.endOf('month').toISOString());
	return { start, end };
};

export const lastYear = () => {
	const start = new Date(currDate.subtract(1, 'year').toISOString());
	const end = new Date(currDate.endOf('month').toISOString());
	return { start, end };
};

export const frenchFormattedDate = (date: any) => {
	dayjs.extend(utc);
	dayjs.extend(localeData);
	dayjs.extend(localizedFormat);

	dayjs.locale(fr);
	const formattedDate = dayjs(date).format('ddd, DD MMM YYYY');
	return formattedDate;
};

export const formattedTime = (date: any) => {
	dayjs.extend(utc);
	dayjs.extend(localeData);
	dayjs.extend(localizedFormat);

	dayjs.locale(fr);
	return dayjs(date).utcOffset(2).format('hh:mm');
};

export const currentWeek = () => {
	const startOfWeek = currDate.startOf('week');
	const endOfWeek = currDate.endOf('week');

	const startDateFormatted = startOfWeek.format('DD/MM/YYYY');
	const endDateFormatted = endOfWeek.format('DD/MM/YYYY');
	return `semaine du ${startDateFormatted} au ${endDateFormatted}`;
};
