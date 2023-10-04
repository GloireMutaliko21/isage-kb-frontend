import { fontBold, fontMedium, fontNormal, fontSemiBold } from '@/assets/fonts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

export async function generatePayroll(id?: string, month?: any) {
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

	const doc = new jsPDF({
		orientation: 'landscape',
	});

	doc.setFont('Cairo-Bold');
	doc.setFontSize(11);
	doc.setTextColor('#000000');
	// doc.setTextColor('#00838F');
	doc.text('ISAGE-KAHUZI BIEGA', 35, 5, { align: 'center' });
	doc.addImage('/images/logo.png', 'PNG', 28, 7, 12, 12);
	doc.setFontSize(8);
	doc.text('Secrétariat Général Administratif', 35, 22, { align: 'center' });
	doc.text('Direction du personnel', 35, 26, { align: 'center' });
	doc.setFontSize(18);
	doc.text('Liste de paie', 150, 17, { align: 'center' });
	doc.setFontSize(8);
	doc.text(`Mois: ${month}`, 150, 25, { align: 'center' });

	autoTable(doc, {
		html: id,
		styles: { font: 'Cairo-Regular' },
		theme: 'grid',
		columnStyles: {
			0: { font: 'Cairo-Bold' },
			2: { font: 'Cairo-Bold' },
			10: { font: 'Cairo-Bold' },
		},
		useCss: true,
		startY: 30,
	});
	doc.save(`liste_de_paie-${month}`);
}
