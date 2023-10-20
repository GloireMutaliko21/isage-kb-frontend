import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { fontBold, fontMedium, fontNormal, fontSemiBold } from '@/assets/fonts';
import { frenchFormattedDate } from '@/utils/dates';

export async function generatePurchaseOrder(order: Order) {
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
		orientation: 'portrait',
		unit: 'in',
		format: [3.34646, 2.16535],
	});

	doc.setFont('Cairo-Bold');
	doc.setFontSize(10);
	doc.text('ISAGE-KAHUZI BIEGA', 1, 0.35, { align: 'center' });
	doc.addImage('/images/logo.png', 'PNG', 0.67, 0.45, 0.7, 0.7);
	doc.setFontSize(8);
	doc.text('Secrétariat Général Administratif', 1, 1.2, {
		align: 'center',
	});
	doc.text('Direction du patrimoine', 1, 1.35, { align: 'center' });
	doc.setFontSize(9);
	doc.text(`Bon de commande`, 1, 1.66, {
		align: 'center',
	});
	doc.setTextColor('#00838F');
	doc.text(`${order.article?.libelle}`, 1, 1.8, {
		align: 'center',
	});
	doc.setTextColor('#000000');
	doc.setFontSize(12);

	doc.text(`Quantité : ${order.qty}`, 1, 2.2, { align: 'center' });

	doc.setFontSize(9);
	doc.text(`${order.article?.unity?.libelle}(s)`, 1, 2.4, { align: 'center' });
	doc.save(
		`bon_de_commande_${order.article?.libelle}_${frenchFormattedDate(
			order.createdAt
		)}.pdf`
	);
}

export async function generateOrderList(orders: Order[]) {
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

	autoTable(doc, {
		styles: { font: 'Cairo-Regular' },
		head: [
			['N°', 'ARTICLE', 'QTE COMMANDEE', 'QTE ACTUELLE', 'STATUT COMMANDE'],
		],
		body: orders.map((order, i) => [
			i + 1,
			order.article?.libelle!,
			order.qty,
			order.article?.qty!,
			order.status!,
		]),
		headStyles: {
			font: 'Cairo-Bold',
			halign: 'center',
		},
		columnStyles: {
			1: { font: 'Cairo-Bold' },
			2: { font: 'Cairo-Bold', halign: 'center' },
			3: { halign: 'center' },
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
				doc.text(`LISTE DES COMMANDES`, 110, 17, { align: 'center' });
			}
		},
	});
	doc.save(`liste_commandes.pdf`);
}
