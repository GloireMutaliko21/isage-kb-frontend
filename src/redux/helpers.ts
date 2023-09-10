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

	getMonthlyByAgent: (agentId: string, year: number, month: number) =>
		`${apiUrl}attendency/agent-monthly/${agentId}?year=${year}&month=${month}`,

	getOwnMonthly: (year: number, month: number) =>
		`${apiUrl}attendency/monthly-me?year=${year}&month=${month}`,
};

export const agentFileUrl = {
	createAndUpdate: `${apiUrl}agent-files`,
};

export const articleUrls = {
	createAndGet: `${apiUrl}article`,
	getCateg: `${apiUrl}article/categ`,
	getUnstock: `${apiUrl}article/unstock`,
	getOne: (id: string) => `${apiUrl}article/${id}`,
};

export const unityUrls = {
	createAndGetAll: `${apiUrl}unity`,
	updateAndGetOne: (id: string) => `${apiUrl}unity/${id}`,
};

export const congeUrls = {
	createAndGet: `${apiUrl}conge`,
	requestConge: `${apiUrl}conge/request`,
	getUnapproved: `${apiUrl}conge/pending`,
	approveConge: (id: string) => `${apiUrl}conge/${id}`,
};

export const folderElementUrls = {
	createAndGet: `${apiUrl}folder-element`,
	getOnePatchDelete: (id: string) => `${apiUrl}folder-element/${id}`,
};

export const gradeUrls = {
	createAndGet: `${apiUrl}grades`,
	getOnePatchDelete: (id: string) => `${apiUrl}grades/${id}`,
};
