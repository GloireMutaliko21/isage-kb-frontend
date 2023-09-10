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

interface DefinePwdDto {
	username: string;
	password: string;
	confirmPassword: string;
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

interface AgentFile {
	agentId_folderElementId: {
		agentId: string;
		folderElementId: string;
	};
	agentId: string;
	folderElementId: string;
	url?: string;
	public_id?: string;
}

interface CreateAgentFileDto {
	agentId: string;
	folderElementId: string;
}

interface UpdateAgentFileDto {
	public_id: string;
	agentId: string;
	folderElementId: string;
}

interface Article extends GeneralData {
	libelle?: string;
	stockAlert?: string;
	unityId?: string;
	categoryId?: string;
	category?: {
		libelle?: string;
	};
	unity?: {
		libelle?: string;
	};
}

interface CreateArticleDto {
	libelle: string;
	stockAlert: number;
	unityId: string;
	categoryId: string;
}

interface Unity extends GeneralData {
	libelle?: string;
	articles?: Aricle[];
}

interface CreateUnityDto {
	id: string;
	libelle: string;
}

interface Conge extends GeneralData {
	startDate?: Date;
	endDate?: Date;
	approved?: boolean;
	agent?: User;
}

interface CreateCongeDto {
	agentId: string;
	startDate: Date;
	endDate: Date;
}

interface UpdateCongeDto extends CreateCongeDto {
	id: string;
}

interface FolderElement extends GeneralData {
	title?: string;
	agents?: {
		agentId: string;
		folderElementId: string;
		url: string;
		public_id: string;
	}[];
}

interface CreateFolderElementDto {
	title: string;
}

interface UpdateFolderElementDto {
	id: string;
	title: string;
}

interface Grade extends GeneralData {
	title?: string;
	rate?: {
		base: number;
		alloc: number;
		conge: number;
		ferie: number;
		maladAcc: number;
		heureSupp: number;
	};
	baseSalary?: number;
	folderIds?: string[];
	agents?: User[];
}

interface CreateGradeDto {
	title: string;
	rate: Record<string, number>;
	folderIds: string[];
}

interface UpdateGradeDto {
	id: string;
	title?: string;
	rate?: Record<string, number>;
	folderIds?: string[];
}

interface Immob extends GeneralData {
	libelle?: string;
	valDepart?: number;
	duration?: number;
	vnc?: number;
	amortissDate?: Date;
	category?: {
		id: string;
		libelle: string;
	};
	service?: {
		id: string;
		libelle: string;
	};
}

interface CreateImmobDto {
	libelle: string;
	valDepart: number;
	duration: number;
	serviceId: string;
	categoryId: string;
}

interface SheetSynthese {
	libelle?: string;
	entree?: number;
	sortie?: number;
	qty?: number;
}

interface SheetGlobalHistoric {
	typeOp: string;
	data: {
		date?: Date;
		libelle: string;
		qte: number;
		designation: libelle;
	}[];
}

interface CreateOperationDto {
	typeOp: string;
	libelle: string;
	qty: number;
	dateOp: Date;
	articleId: string;
}

interface YearMonthParams {
	year: number;
	month: number;
}

interface StartEndDatesParams {
	id?: string;
	start: Date;
	end: Date;
}

interface Order extends GeneralData {
	qty: number;
	status?: string;
	articleId: string;
	article?: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		libelle: string;
		qty: number;
		stockAlert: number;
		categoryId: string;
		unityId: string;
	};
}

interface CreateOrderDto {
	qty: string;
	articleId: string;
}

interface Category extends GeneralData {
	libelle?: string;
	immobilisation?: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		libelle: string;
		valDepart: number;
		duration: number;
		vnc: number;
		amortissDate: Date;
		categoryId: string;
		serviceId: string;
	}[];
	articles?: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		libelle: string;
		qty: number;
		stockAlert: number;
		categoryId: string;
		unityId: string;
	}[];
}

interface CreateCategoryDto {
	id?: string;
	libelle: string;
}

interface Role extends GeneralData {
	title: string;
}

interface createRoleDto {
	title: string;
}

interface UpdateRoleDto {
	id: string;
	agentId: string;
	roleId: string;
}

interface CreateAccess {
	roleId: string;
	agentId: string;
}

interface HrefLink {
	href: string;
	label: string;
}
