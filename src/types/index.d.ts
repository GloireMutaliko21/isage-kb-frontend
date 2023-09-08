interface User {
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
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
	contacts: object;
	username: string;
	imgUrl: string;
	public_id: string;
	gradeId?: string;
	roles?: {
		id: string;
		createdAt?: Date;
		updatedAt?: Date;
		title: string;
	}[];
}

interface HrefLink {
	href: string;
	label: string;
}
