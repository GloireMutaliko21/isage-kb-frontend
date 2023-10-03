import { fontBold, fontMedium, fontNormal, fontSemiBold } from '@/assets/fonts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

export async function generatePaySlip(id?: string, agent?: User, month?: any) {
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

	const doc = new jsPDF();
	doc.setFont('Cairo-Bold');
	doc.setFontSize(11);
	doc.setTextColor('#00838F');
	doc.text('ISAGE-KAHUZI BIEGA', 35, 5, { align: 'center' });
	doc.addImage('/images/logo.png', 'PNG', 28, 7, 12, 12);
	doc.setFontSize(8);
	doc.text('Secrétariat Général Administratif', 35, 22, { align: 'center' });
	doc.text('Direction du personnel', 35, 26, { align: 'center' });
	doc.setFontSize(16);
	doc.text('Fiche de paie', 100, 17, { align: 'center' });
	doc.setFontSize(8);
	doc.text(`Mois: ${month}`, 100, 25, { align: 'center' });
	doc.setFont('Cairo-SemiBold');
	doc.setFontSize(10);
	doc.setTextColor('#16A34A');
	doc.text('Salarié', 140, 5);
	doc.setDrawColor(22, 163, 74);
	doc.setLineWidth(1);
	doc.line(140, 7, 195, 7);
	doc.setTextColor('#00838F');
	doc.setFont('Cairo-Regular');
	doc.setFontSize(9);
	doc.text('Noms', 143, 11);
	doc.text('Matricule', 143, 15);
	doc.text('Grade', 143, 19);
	doc.text('Fonction', 143, 23);

	doc.text(`: ${agent?.names}`, 157, 11);
	doc.text(`: ${agent?.matricule}`, 157, 15);
	doc.text(`: ${agent?.grade?.title}`, 157, 19);
	doc.text(`: ${agent?.function}`, 157, 23);

	autoTable(doc, {
		html: id,
		styles: { font: 'Cairo-Regular' },
		theme: 'grid',
		columnStyles: {
			0: { font: 'Cairo-Bold' },
			2: { font: 'Cairo-Bold' },
		},
		useCss: true,
		startY: 30,
	});
	doc.save('liste.pdf');
}
