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

export const immobUrls = {
	createAndGet: `${apiUrl}immob`,
	getAmortis: `${apiUrl}immob/amortis`,
};

export const inventaireUrls = {
	createOp: `${apiUrl}inventaire`,
	getSheetToday: `${apiUrl}inventaire/today`,
	getSheetWeek: `${apiUrl}inventaire/week`,
	getSheetSynthese: `${apiUrl}inventaire/synthese`,
	getGlobal: (start: Date, end: Date) =>
		`${apiUrl}inventaire?start=${start}&end=${end}`,
	getGlobalHistoricByArticle: (id: string, start: Date, end: Date) =>
		`${apiUrl}inventaire/${id}?start=${start}&end=${end}`,
};

export const orderUrls = {
	createAndGet: `${apiUrl}order`,
	getHistoric: `${apiUrl}order/historic`,
	close: (id: string) => `${apiUrl}order/close/${id}`,
	cancel: (id: string) => `${apiUrl}order/cancel/${id}`,
};

export const categoryUrls = {
	createAndGet: `${apiUrl}category`,
	updateAndGetOne: (id: string) => `${apiUrl}category/${id}`,
};

export const roleUrls = {
	createAndGet: `${apiUrl}roles`,
	getOneUpdateDelete: (id: string) => `${apiUrl}roles/${id}`,
	createAccess: (agentId: string) => `${apiUrl}roles/access/${agentId}`,
	removeAccess: (agentId: string) => `${apiUrl}roles/rm/${agentId}`,
};

export const sectionUrls = {
	createAndGet: `${apiUrl}service`,
	updateAndGetOne: (id: string) => `${apiUrl}service/${id}`,
};

export const subscriptionUrls = {
	subscribe: `${apiUrl}subscription`,
	getSubscriptions: (id: string) => `${apiUrl}subscription`,
};

export const socialCaseUrls = {
	createAndGet: `${apiUrl}social-case`,
	getInprogress: `${apiUrl}social-case/progress`,
	update: (id: string) => `${apiUrl}social-case/${id}`,
	publish: (id: string) => `${apiUrl}social-case/pub/${id}`,
	close: (id: string) => `${apiUrl}social-case/close/${id}`,
};
