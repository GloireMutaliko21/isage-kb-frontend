import { fontBold, fontMedium, fontNormal, fontSemiBold } from '@/assets/fonts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export async function generateStockSheet(
	idEntry?: string,
	idOut?: string,
	text?: string
) {
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
	doc.text('Direction du patrimoine', 35, 26, { align: 'center' });
	doc.setFontSize(13);
	doc.text(`Fiche de stock ${text}`, 150, 17, { align: 'center' });
	doc.setFontSize(8);

	var pageNumber = doc.getNumberOfPages();

	autoTable(doc, {
		html: idEntry,
		margin: { right: 152 },
		styles: { font: 'Cairo-Regular' },
		theme: 'grid',
		columnStyles: {
			2: { font: 'Cairo-Bold' },
			4: { font: 'Cairo-Bold' },
		},
		startY: 30,
	});
	doc.setPage(pageNumber);
	autoTable(doc, {
		html: idOut,
		margin: { left: 145 },
		styles: { font: 'Cairo-Regular' },
		theme: 'grid',
		columnStyles: {
			2: { font: 'Cairo-Bold' },
			4: { font: 'Cairo-Bold' },
		},
		startY: 30,
	});
	doc.save(`fiche_de_stock-${text}.pdf`);
}
