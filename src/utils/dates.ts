import dayjs from 'dayjs';

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
