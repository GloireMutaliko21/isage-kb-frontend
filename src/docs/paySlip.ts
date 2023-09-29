import { font } from '@/assets/fonts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

export async function generatePaySlip(id?: string) {
	(function (jsPDFAPI: typeof jsPDF.API) {
		const callAddFont = function (this: any) {
			this.addFileToVFS('Cairo-Regular-normal.ttf', font);
			this.addFont('Cairo-Regular-normal.ttf', 'Cairo-Regular', 'normal');
		};
		jsPDFAPI.events.push(['addFonts', callAddFont]);
	})(jsPDF.API);

	const doc = new jsPDF();
	doc.setFont('Cairo-Regular');
	doc.text('Some Text with Google Fonts', 10, 10);
	autoTable(doc, {
		html: id,
		styles: { font: 'Cairo-Regular', fontStyle: 'normal' },
		theme: 'grid',

		useCss: true,
	});
	doc.save('liste.pdf');
}
