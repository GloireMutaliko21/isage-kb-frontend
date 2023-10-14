import { fontBold, fontMedium, fontNormal, fontSemiBold } from '@/assets/fonts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export async function generateArticlesList(articles: Article[], label = '') {
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
			['N°', 'DESIGNATION', 'QUANTITE', 'UNITE', 'CATEGORIE', 'STOCK ALERTE'],
		],
		body: articles?.map((article, i) => [
			i + 1,
			article.libelle!,
			article.qty!,
			article.unity?.libelle!,
			article.category?.libelle!,
			article.stockAlert!,
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
			1: { font: 'Cairo-Bold', halign: 'center' },
			2: { font: 'Cairo-Bold', halign: 'center' },
			3: { halign: 'center' },
			4: { halign: 'center' },
			5: { halign: 'center' },
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
				doc.text('Direction du personnel', 35, 26, { align: 'center' });
				doc.setFontSize(13);
				doc.text(`LISTE D'ARTICLES ${label}`, 110, 17, { align: 'center' });
			}
		},
	});
	doc.save(`liste_articles_${label.toLowerCase()}.pdf`);
}

export async function generateArticlesListByCateg(articles: ArticleByCated[]) {
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
	doc.setTextColor('#000000');
	// doc.setTextColor('#00838F');
	doc.text('ISAGE-KAHUZI BIEGA', 35, 5, { align: 'center' });
	doc.addImage('/images/logo.png', 'PNG', 28, 7, 12, 12);
	doc.setFontSize(8);
	doc.text('Secrétariat Général Administratif', 35, 22, {
		align: 'center',
	});
	doc.text('Direction du personnel', 35, 26, { align: 'center' });

	let y = 0;

	articles.forEach((article, index) =>
		autoTable(doc, {
			styles: { font: 'Cairo-Regular' },
			head: [['N°', 'DESIGNATION', 'QUANTITE', 'UNITE', 'STOCK ALERTE']],
			body: article?.articles.map((el, i) => [
				i + 1,
				el.libelle!,
				el.qte!,
				el.unity!,
				el.stockAlert!,
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
				1: { font: 'Cairo-Bold', halign: 'center' },
				2: { font: 'Cairo-Bold', halign: 'center' },
				3: { halign: 'center' },
				4: { halign: 'center' },
				5: { halign: 'center' },
			},
			startY: index == 0 ? 30 + y : 20 + y,
			didDrawPage: (d) => {
				y = d.cursor?.y!;
			},
			willDrawPage: (data) => {
				doc.setTextColor('#00838F');
				doc.setFontSize(10);
				doc.text(
					`LISTE D'ARTICLES POUR ${article.categorie.toUpperCase()}`,
					110,
					index == 0 ? 25 + y : 17 + y,
					{
						align: 'center',
					}
				);
			},
		})
	);
	doc.save('liste_articles_by_category.pdf');
}
