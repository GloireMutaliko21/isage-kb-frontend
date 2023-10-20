import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { fontBold, fontMedium, fontNormal, fontSemiBold } from '@/assets/fonts';
import { frenchFormattedDate } from '@/utils/dates';

export async function generateImmobsList(immobs: Immob[]) {
	(function (jsPDFAPI: typeof jsPDF.API) {
		const callAddFont = function (this: any) {
			this.addFileToVFS('Cairo-Regular-normal.ttf', fontNormal);
			this.addFont('Cairo-Regular-normal.ttf', 'Cairo-Regular', 'normal');
			this.addFileToVFS('Cairo-Medium-normal.ttf', fontMedium);
			this.addFont('Cairo-Medium-normal.ttf', 'Cairo-Medium', 'normal');
			this.addFileToVFS('Cairo-SemiBold-normal.ttf', fontSemiBold);
			this.addFont('Cairo-SemiBold-normal.ttf', 'Cairo-SemiBold', 'normal');
			this.addFileToVFS('Cairo-Bold-normal.ttf', fontBold);
			this.addFont('Cairo-Bold-normal.ttf', 'Cairo-Bold', 'normal');
		};
		jsPDFAPI.events.push(['addFonts', callAddFont]);
	})(jsPDF.API);

	const doc = new jsPDF({ orientation: 'l' });

	autoTable(doc, {
		styles: { font: 'Cairo-Regular' },
		head: [
			[
				'N°',
				'LIBELLE',
				'VAL ACQUISITION',
				'DUREE',
				'VNC',
				'SERVICE',
				'CATEGORIE',
				'DATE AMORT',
			],
		],
		body: immobs?.map((immob, i) => [
			i + 1,
			immob.libelle!,
			immob.valDepart!,
			immob.duration!,
			immob.vnc!,
			immob.service?.libelle!,
			immob.category?.libelle!,
			frenchFormattedDate(immob.amortissDate)!,
		]),
		theme: 'grid',
		headStyles: {
			fillColor: '#fff',
			textColor: '#000000',
			lineWidth: 0.1,
			font: 'Cairo-Bold',
			halign: 'center',
		},
		columnStyles: {
			0: { halign: 'center' },
			1: { font: 'Cairo-Bold' },
			2: { font: 'Cairo-Bold', halign: 'center' },
			3: { halign: 'center' },
			4: { halign: 'center' },
		},
		startY: 30,
		willDrawPage: (data) => {
			if (data.pageNumber === 1) {
				doc.setFont('Cairo-Bold');
				doc.setFontSize(11);
				doc.setTextColor('#000000');
				// doc.setTextColor('#00838F');
				doc.text('ISAGE-KAHUZI BIEGA', 35, 5, { align: 'center' });
				doc.addImage('/images/logo.png', 'PNG', 28, 7, 12, 12);
				doc.setFontSize(8);
				doc.text('Secrétariat Général Administratif', 35, 22, {
					align: 'center',
				});
				doc.text('Direction du patrimoine', 35, 26, { align: 'center' });
				doc.setFontSize(13);
				doc.text(`LISTE D'IMMOBILISATIONS`, 160, 17, { align: 'center' });
			}
		},
	});
	doc.save(`liste_immobs.pdf`);
}
