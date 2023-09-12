export const nonAmortis = (amortis: Immob[], all: Immob[]) => {
	const nonAmort = all.filter((immob) => !amortis.includes(immob));
	return nonAmort;
};
