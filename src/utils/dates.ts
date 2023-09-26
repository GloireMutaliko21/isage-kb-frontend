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
	const formattedDate = dayjs.utc(date).format('dddd, [le] DD MMM YYYY');
	return formattedDate;
};

export const formattedTime = (date: any) => {
	dayjs.extend(utc);
	dayjs.extend(localeData);
	dayjs.extend(localizedFormat);

	dayjs.locale(fr);
	return dayjs.utc(date).format('hh:mm');
};
