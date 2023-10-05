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
	sifa?: string;
	contacts?: any;
	username?: string;
	password?: string;
	imgUrl?: string;
	public_id?: string;
	gradeId?: string;
	grade?: Grade;
	roles?: {
		id: string;
		createdAt?: Date;
		updatedAt?: Date;
		title: string;
	}[];
	folderElements?: {
		agentId: string;
		folderElementId: string;
		url: srting;
		public_id: string;
		folderElement: {
			id: string;
			createdAt: string;
			updatedAt: string;
			title: string;
		};
	}[];
	missingAgentFiles?: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
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
	sifa: string;
	username?: string;
	password?: string;
	contacts: any;
	file?: any;
	gradeId: string;
	dispatch?: any;
}

interface UpdateAgentDto {
	id: string;
	matricule?: string;
	function?: string;
	status?: string;
	engagDate?: Date;
	promDate?: Date;
	acadTitle?: string;
	sifa?: string;
	dispatch?: any;
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
	file?: any;
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
	file?: any;
}

interface UpdateAgentFileDto {
	public_id: string;
	agentId: string;
	folderElementId: string;
	file?: dto;
}

interface Article extends GeneralData {
	libelle?: string;
	qty?: number;
	stockAlert?: number;
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

interface UpdateArticleDto {
	id?: string;
	libelle?: string;
	stockAlert?: number;
	unityId?: string;
	categoryId?: string;
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
	dispatch?: any;
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
	folderElements?: FolderElement[];
}

interface CreateGradeDto {
	title: string;
	baseSalary: string | number;
	rate: Record<string, string | number>;
	folderIds: string[];
	dispatch?: any;
}

interface UpdateGradeDto {
	id: string;
	title?: string;
	baseSalary?: number;
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
	id?: string;
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
	dispatch?: any;
}

interface UpdateRoleDto {
	id: string;
	title: string;
}

interface CreateAccess {
	roleId: string;
	agentId: string;
}

interface Section extends GeneralData {
	libelle?: string;
	immobilisations?: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		libelle: libelle;
		valDepart: number;
		duration: number;
		vnc: number;
		amortissDate: Date;
		categoryId: string;
		serviceId: string;
	}[];
}

interface Subscription extends GeneralData {
	montant: number;
	casSocId: string;
	agentId: string;
	casSoc?: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		description: string;
		endDate: Date;
		status: string;
		validity: string;
		agentId: string;
		agent: {
			names: string;
		};
	};
	agent?: {
		names: string;
	};
}

interface CreatedSubscription {
	subscription: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		montant: number;
		casSocId: string;
		agentId: string;
	};
	deduction: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		amount: number;
		libelle: string;
		agentId: string;
	};
}

interface CreateSubscriptionDto {
	montant: number;
	casSocId: string;
}

interface SocialCase extends GeneralData {
	description: string;
	endDate: Date;
	status: string;
	validity: string;
	agentId: string;
	agent?: User;
	casSocSubscriptions?: Subscription[];
}

interface CreateSocialCaseDto {
	description: string;
	endDate: Date;
}

interface UpdateSocialCaseDto {
	id: string;
	description?: string;
	endDate?: Date;
	dispatch: any;
}

interface CreatedRemMalad extends GeneralData {
	days: number;
	libelle: string;
	agentId: string;
	agent: User;
}

interface RemMalad {
	days: number;
	total: number;
}

interface CreatedDeductionPrime extends GeneralData {
	amount: number;
	libelle: string;
	agentId: string;
	agent: User;
}

interface DeductionPrime {
	total: number;
}

interface DeductionPrimeSynthese {
	_sum: {
		amount: number;
	};
	libelle: string;
}

interface CreatedAllocRemCongFerie extends GeneralData {
	days: number;
	agentId: string;
	agent: User;
}

interface Alloc {
	days: number;
	nbEnfant: number;
	total: number;
}

interface CreatedHSupp extends GeneralData {
	number: number;
	agentId: string;
	agent: User;
}

interface HSupp {
	hours: number;
	total: number;
}

interface RemCongeFerie {
	days: number;
	total: number;
}

interface PaySlip extends GeneralData {
	month: string;
	baseSalary: {
		base: number;
		rate: number;
	};
	supHours: {
		rate: number;
		hours: number;
	};
	jFeries: {
		days: number;
		rate: number;
	};
	jConge: {
		days: number;
		rate: number;
	};
	primes: any;
	deductions: any;
	alloc: {
		days: number;
		rate: number;
		children: number;
	};
	jMaldAcc: {
		days: number;
		rate: number;
	};
	agentId: string;
	agent: User;
}

interface PayList {
	names: string;
	grade: string;
	salary: number;
	suppHours: number;
	ferie: number;
	conge: number;
	primes: number;
	deduction: number;
	alloc: number;
	maladie: number;
}

interface Unpaid {
	id: string;
	names: string;
	grade: Grade;
	primes: {
		amount: number;
	}[];
	suppHours: {
		number: number;
	}[];
	remJMaladAccs: {
		days: number;
	}[];
	remJoursConges: {
		days: number;
	}[];
	remJoursFerie: {
		days: number;
	}[];
	salaryDeductions: {
		amount: number;
	}[];
	familyAllocations: {
		days: number;
	}[];
}

interface RemJMaladAccDto {
	days: number;
	libelle: string;
	agentId: string;
}

interface SalaryDeductionDto {
	amount: number;
	libelle: string;
	agentId: string;
}

interface FamilyAllocationDto {
	days: number;
	agentId: string;
}

interface SuppHourDto {
	number: number;
	agentId: string;
}

interface CreatePaySlipDto {
	year: number;
	month: number;
	agentId: string;
}

interface HrefLink {
	href: string;
	label: string;
}

interface ModalsHandlers {
	id?: string;
	close?: (id: string) => void;
}
