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
				'DATE DE NAISS',
				"DATE D'ENGAGEMENT",
				'SIFA',
				'TITRE ACAD',
				'D DERNIERE PROMOTION',
				'CONTACTS',
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
			agent.promDate
				? frenchFormattedDate(agent.promDate)
				: frenchFormattedDate(agent.engagDate),
			Object.values(agent.contacts!),
		]),
		theme: 'grid',
		headStyles: {
			fillColor: '#fff',
			textColor: '#000000',
			fontSize: 8,
			fontStyle: 'normal',
			lineWidth: 0.1,
			font: 'times',
		},
		bodyStyles: {
			fontSize: 7,
			font: 'times',
		},
		startY: 20,
		willDrawPage: (data) => {
			if (data.pageNumber === 1) {
				doc.setFontSize(12);
				doc.text(
					'LISTE DECLARATIVE DU PERSONNEL',
					160 - data.settings.margin.left,
					14,
					{ align: 'center' }
				);
			}
		},
	});
	doc.save('liste_agents.pdf');
}
