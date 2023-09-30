const baseSalary = (payslip: PaySlip | null) => {
	const base = payslip?.baseSalary?.base ?? 0;
	const rate = payslip?.baseSalary?.rate ?? 0;
	return { rate, base, total: rate * base };
};

const suppHours = (payslip: PaySlip | null) => {
	const hours = payslip?.supHours?.hours ?? 0;
	const rate = payslip?.supHours?.rate ?? 0;
	return { rate, hours, total: rate * hours };
};

const joursFeries = (payslip: PaySlip | null) => {
	const days = payslip?.jFeries?.days ?? 0;
	const rate = payslip?.jFeries?.rate ?? 0;
	return { rate, days, total: rate * days };
};

const joursConge = (payslip: PaySlip | null) => {
	const days = payslip?.jConge?.days ?? 0;
	const rate = payslip?.jConge?.rate ?? 0;
	return { rate, days, total: rate * days };
};

const joursMaladAcc = (payslip: PaySlip | null) => {
	const days = payslip?.jMaldAcc?.days ?? 0;
	const rate = payslip?.jMaldAcc?.rate ?? 0;
	return { rate, days, total: rate * days };
};

const primes = (paySlip: PaySlip | null) => {
	const risque = paySlip?.primes?.['Primes de risque'] ?? 0;
	const anciennete = paySlip?.primes?.["Primes d'ancienneté"] ?? 0;
	const penibility = paySlip?.primes?.['Primes de pénibilité'] ?? 0;
	const birth = paySlip?.primes?.['Naissance'] ?? 0;
	const gratication = paySlip?.primes?.['Gratifications'] ?? 0;
	const other = paySlip?.primes?.['Divers'] ?? 0;

	return {
		risque,
		anciennete,
		penibility,
		birth,
		gratication,
		other,
		total: risque + anciennete + penibility + birth + gratication + other,
	};
};

const deductionData = (payslip: PaySlip | null) => {
	const pensions = payslip?.deductions?.['Pensions'] ?? 0;
	const indemnites = payslip?.deductions?.['Indemnités'] ?? 0;
	const avances = payslip?.deductions?.['Avances sur salaire'] ?? 0;
	const retenusFisc = payslip?.deductions?.['Retenues fiscales'] ?? 0;
	const casSoc = payslip?.deductions?.['Cas sociaux'] ?? 0;
	const other = payslip?.deductions?.['Divers'] ?? 0;

	return {
		pensions,
		indemnites,
		avances,
		retenusFisc,
		casSoc,
		other,
		total: pensions + indemnites + avances + retenusFisc + casSoc + other,
	};
};

const alloc = (paySlip: PaySlip | null) => {
	const children = paySlip?.alloc?.children ?? 0;
	const days = paySlip?.alloc?.days ?? 0;
	const rate = paySlip?.alloc?.rate ?? 0;
	return { children, days, rate, total: children * days * rate };
};

export {
	baseSalary,
	suppHours,
	joursFeries,
	joursConge,
	joursMaladAcc,
	primes,
	deductionData,
	alloc,
};
