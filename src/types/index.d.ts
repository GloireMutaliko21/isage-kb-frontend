interface GeneralData {
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface User extends GeneralData {
	names: string;
	email: string;
	matricule: string;
	sex?: string;
	function?: string;
	status?: string;
	nbChildren?: number;
	birthDate?: Date;
	engagDate?: Date;
	promDate?: Date;
	acadTitle?: string;
	sifa?: number;
	contacts?: object;
	username?: string;
	password?: string;
	imgUrl?: string;
	public_id?: string;
	gradeId?: string;
	roles?: {
		id: string;
		createdAt?: Date;
		updatedAt?: Date;
		title: string;
	}[];
}

interface CreateAgentDto {
	email: string;
	names: string;
	matricule: string;
	sex: string;
	function: string;
	status: string;
	birthDate: Date;
	engagDate: Date;
	promDate?: Date;
	acadTitle: string;
	sifa: number;
	username?: string;
	password?: string;
	contacts: Record<string, any>;
	file?: File;
	gradeId: string;
}

interface UpdateAgentDto {
	id: string;
	matricule?: string;
	function?: string;
	status?: string;
	engagDate?: Date;
	promDate?: Date;
	acadTitle?: string;
	sifa?: number;
}

interface UpdateAgentProfileDto {
	id: string;
	names?: string;
	email?: string;
	sex?: string;
	bithDate?: Date;
	username?: string;
	password: string;
	contacts?: Record<string, any>;
	file?: File;
}

interface Attendency extends GeneralData {
	status: string;
	agentId?: string;
	agent?: User;
}

interface CreateAttendencyDto {
	dateNow: Date;
	agentId: string;
}

interface YearMonthParams {
	year: number;
	month: number;
}

interface HrefLink {
	href: string;
	label: string;
}
