import { frenchFormattedDate } from '@/utils/dates';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export async function generateAgentList(agents: User[]) {
	const doc = new jsPDF({
		orientation: 'landscape',
	});
	autoTable(doc, {
		head: [
			[
				'N°',
				'NOMS ET POSTNOM',
				'SEXE',
				'MATRICULE',
				'GRADE',
				'FONCTION',
				'DATE DE NAISSANCE',
				"DATE D'ENGAGEMENT",
				'SIFA',
				'TITRE ACADEMIQUE',
				'D DERNIERE PROMOTION',
				'CONTACTS',
				'',
			],
		],
		body: agents?.map((agent, i) => [
			i + 1,
			agent.names,
			agent.sex!,
			agent.matricule,
			agent.grade?.title!,
			agent.function!,
			frenchFormattedDate(agent.birthDate),
			frenchFormattedDate(agent.engagDate),
			agent.sifa!,
			agent.acadTitle!,
			frenchFormattedDate(agent.promDate),
			Object.values(agent.contacts!),
			'',
		]),
	});
	doc.save('liste_agents.pdf');
}
