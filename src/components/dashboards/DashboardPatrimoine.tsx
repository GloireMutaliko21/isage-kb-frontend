import Link from 'next/link';
import React from 'react';
import CardsStatsInventaire from './PersPatr/CardsStatsInventaire';
import useArticles from '@/hooks/useArticles';
import useInventaire from '@/hooks/useInventaire';
import useImmob from '@/hooks/useImmob';
import DashboardCharts from '../patrimoine/DashboardCharts';
import { type PieConfig, type ColumnConfig } from '@ant-design/plots';
import { columnInventaireChartData } from '@/features/inventaire';
import { nonAmortis } from '@/features/immob';

const DashboardPatrimoine = () => {
	const { articles, unStocked } = useArticles();
	const {
		stockSheet,
		globalSheet,
		lastYearGlobHistoric,
		lastSixMonthsGlobalHistoric,
	} = useInventaire();
	const { amortis, immobs } = useImmob();

	const onChangeLastYear = (checked: boolean) => {
		if (checked) lastYearGlobHistoric();
		else lastSixMonthsGlobalHistoric();
	};

	const config: ColumnConfig = {
		data: columnInventaireChartData(globalSheet),
		isGroup: true,
		xField: 'libelle',
		yField: 'qty',
		seriesField: 'operation',
		color: ['#01579B', '#0097A7'],
		minColumnWidth: 30,
		maxColumnWidth: 30,
	};

	const immobChartData = [
		{
			Category: 'Total',
			number: immobs.length,
		},
		{
			Category: 'Non amortis',
			number: nonAmortis(amortis, immobs).length,
		},
		{
			Category: 'Amortis',
			number: amortis.length,
		},
	];

	const configImmob: PieConfig = {
		appendPadding: 10,
		data: immobChartData,
		angleField: 'number',
		colorField: 'Category',
		radius: 1,
		innerRadius: 0.6,
		color: ['#01579B', '#0097A7', '#4DD0E1'],
		label: {
			type: 'inner',
			offset: '-50%',

			style: {
				textAlign: 'center',
				fontSize: 14,
			},
		},
		interactions: [
			{
				type: 'element-selected',
			},
			{
				type: 'element-active',
			},
		],
		legend: { layout: 'horizontal', position: 'bottom' },
		statistic: {
			title: false,
			content: {
				style: {
					whiteSpace: 'pre-wrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					fontSize: '14px',
				},
				content: 'Immobilisations',
			},
		},
	};

	return (
		<section>
			{/* Header */}
			<div className='border-b flex justify-between items-center p-5'>
				<h1 className='text-2xl font-semibold'>Dashboard</h1>
				<div>
					<Link
						href='/stocks/inv'
						className='bg-secondary-600 hover:bg-secondary-500 hover:shadow-lg duration-300 p-3 py-2 text-sm w-full text-white rounded-md flex gap-2 justify-center items-center'
					>
						Etats des stocks
					</Link>
				</div>
			</div>

			{/* Cards */}
			<CardsStatsInventaire
				articles={articles}
				unStocked={unStocked}
				todaySheet={stockSheet}
				amortis={amortis}
				immobs={immobs}
			/>

			{/* Charts */}
			<DashboardCharts
				config={config}
				configImmob={configImmob}
				onChangeLastYear={onChangeLastYear}
			/>
		</section>
	);
};

export default DashboardPatrimoine;
