export const dashBoardPieChartData = (globalData: Attendency[]) => {
	const presences = globalData.filter((attend) => attend.status == 'present');
	const absences = globalData.filter((attend) => attend.status == 'absent');
	const retards = globalData.filter((attend) => attend.status == 'retars');
	const legerRetards = globalData.filter(
		(attend) => attend.status == 'leger retard'
	);
	const leaves = globalData.filter((attend) => attend.status == 'en conge');

	const attendChartData: {
		Category: string;
		total: number;
	}[] = [
		{
			Category: 'Présences',
			total: presences.length,
		},
		{
			Category: 'Absences',
			total: absences.length,
		},
		{
			Category: 'Retards',
			total: retards.length,
		},
		{
			Category: 'Léger retars',
			total: legerRetards.length,
		},
		{
			Category: 'En congés',
			total: leaves.length,
		},
	];
	return attendChartData;
};
