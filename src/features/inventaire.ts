export const columnInventaireChartData = (data: SheetGlobalHistoric[]) => {
	const entries = data.filter((d) => d.typeOp == 'entry');
	const sorties = data.filter((d) => d.typeOp == 'out');

	const entriesData = entries.map((d) => ({
		operation: 'Entrées',
		libelle: d.data[0].designation,
		qty: d.data.reduce((a, c) => a + c.qte, 0),
	}));
	const sortiesData = sorties.map((d) => ({
		operation: 'Sorties',
		libelle: d.data[0].designation,
		qty: d.data.reduce((a, c) => a + c.qte, 0),
	}));

	return entriesData.concat(sortiesData);
};
