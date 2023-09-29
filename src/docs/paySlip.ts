import { fontBold, fontMedium, fontNormal, fontSemiBold } from '@/assets/fonts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

export async function generatePaySlip(id?: string) {
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
	doc.setFont('Cairo-Regular');
	doc.text('Some Text with Google Fonts', 10, 10);
	autoTable(doc, {
		html: id,
		styles: { font: 'Cairo-Regular' },
		theme: 'grid',
		columnStyles: {
			0: { font: 'Cairo-Bold' },
		},
		useCss: true,
	});
	doc.save('liste.pdf');
}
