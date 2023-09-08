const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/`;

export const authUrls = {
	login: `${apiUrl}auth/login`,
	getMe: `${apiUrl}agents/profile`,
	definePwd: `${apiUrl}agents/profile/pwd`,
};

export const agentsUrls = {
	getAllAndCreate: `${apiUrl}agents`,
	getByIdAndUpdate: (id: string) => `${apiUrl}agents/${id}`,
};

export const attendecyUrls = {
	getAllDailyAndCreate: `${apiUrl}attendency`,

	getMonthly: (year: number, month: number) =>
		`${apiUrl}attendency/monthly?year=${year}&month=${month}`,

	getMonthlyByAgent: (year: number, month: number) =>
		`${apiUrl}attendency/agent-monthly?year=${year}&month=${month}`,

	getOwnMonthly: (year: number, month: number) =>
		`${apiUrl}attendency/monthly-me?year=${year}&month=${month}`,
};
