import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode';

export async function generateServiceCard(agent: User) {
	const doc = new jsPDF({
		orientation: 'landscape',
		unit: 'in',
		format: [3.34646, 2.16535],
	});

	doc.setFontSize(13);
	doc.setTextColor('#00838F');
	doc.text('ISAGE-KB', 1.67323, 0.2, { align: 'center' });
	doc.setFontSize(5.5);
	doc.text(
		"Institut Supérieur d'Agroforesterie et de Gestion de l'environnement de Kahuzi-Biega",
		1.67323,
		0.35,
		{ align: 'center' }
	);

	doc.setLineWidth(0.025);
	doc.setDrawColor(0, 131, 143);
	doc.line(0, 0.5, 3.34646, 0.5);

	doc.addImage(agent.imgUrl! || '/images/logo.png', 'PNG', 0, 0.6, 1, 1);
	doc.setTextColor('#000000');
	doc.setFont('times', 'bold', 900);
	doc.setFontSize(7);

	doc.text('Noms et postnom', 1.05, 0.7);
	doc.text('Matricule', 1.05, 0.85);
	doc.text('Grade', 1.05, 1);
	doc.text('Fonction', 1.05, 1.15);
	doc.text('Téléphone', 1.05, 1.3);
	doc.text('E-mail', 1.05, 1.45);

	doc.text(`: ${agent.names}`, 1.85, 0.7);
	doc.text(`: ${agent.matricule}`, 1.85, 0.85);
	doc.text(`: ${agent.grade?.title}`, 1.85, 1);
	doc.text(`: ${agent.function}`, 1.85, 1.15);
	doc.text(`: ${agent?.contacts?.phone}`, 1.85, 1.3);
	doc.text(`: ${agent.email}`, 1.85, 1.45);
	doc.text(`: ${agent.names}`, 1.85, 0.7);
	doc.text(`: ${agent.matricule}`, 1.85, 0.85);
	doc.text(`: ${agent.grade?.title}`, 1.85, 1);
	doc.text(`: ${agent.function}`, 1.85, 1.15);
	doc.text(`: ${agent?.contacts?.phone}`, 1.85, 1.3);
	doc.text(`: ${agent.email}`, 1.85, 1.45);

	const qrCodeData = await QRCode.toDataURL(agent.id);
	doc.addImage(qrCodeData, 'PNG', 2.64646, 1.46535, 0.7, 0.7);

	doc.text('Le Secrétaire Général Administratif', 0.1, 1.8);
	doc.text('Prof. Gloire Mutaliko', 0.1, 2.1);

	doc.addPage([3.34646, 2.16535], 'landscape');
	doc.setFontSize(18);
	doc.setTextColor('#00838F');
	doc.text('ISAGE-KB', 1.67323, 0.35, { align: 'center' });
	doc.addImage('/images/logo.png', 'PNG', 1.05, 0.4, 1.2, 1.2);
	doc.setFontSize(14);
	doc.text('CARTE DE SERVICE', 1.67323, 1.73, {
		align: 'center',
	});
	doc.setLineWidth(0.01);
	doc.line(0.8, 1.742, 2.6, 1.742);

	doc.setFontSize(7);
	doc.setTextColor('#000000');
	doc.text('Les autorités civiles et militaires sont priées', 1.67323, 2, {
		align: 'center',
	});
	doc.text("d'apporter assistance au porteur de la présente", 1.67323, 2.1, {
		align: 'center',
	});

	doc.save(`service-card-${agent.names}.pdf`);
}
