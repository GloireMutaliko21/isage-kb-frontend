'use client';
import Link from 'next/link';
import React from 'react';
import useAgents from '@/hooks/useAgents';
import useAttendency from '@/hooks/useAttendency';
import { HiArrowRight } from 'react-icons/hi2';
import useConge from '@/hooks/useConge';
import useRemuneration from '@/hooks/useRemuneration';
import {
	Column,
	Pie,
	type ColumnConfig,
	type PieConfig,
} from '@ant-design/plots';
import useInventaire from '@/hooks/useInventaire';
import { columnInventaireChartData } from '@/features/inventaire';
import { Switch } from 'antd';
import useImmob from '@/hooks/useImmob';
import { nonAmortis } from '@/features/immob';
import AgentDashboardTable from '../personnel/AgentDashboardTable';
import AllCardsStats from './PersPatr/AllCardsStats';

const PersPatr = () => {
	const { agents } = useAgents();
	const { paie } = useRemuneration();
	const { agentInConges } = useConge();
	const { attendecies } = useAttendency();
	const { globalSheet, lastYearGlobHistoric, lastSixMonthsGlobalHistoric } =
		useInventaire();
	const { amortis, immobs } = useImmob();

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

	const onChangeLastYear = (checked: boolean) => {
		if (checked) lastYearGlobHistoric();
		else lastSixMonthsGlobalHistoric();
	};
	return (
		<section>
			<div className='border-b flex justify-between items-center p-5'>
				<h1 className='text-2xl font-semibold'>Dashboard</h1>
				<div>
					<Link
						href='/attend/scan'
						className='bg-secondary-600 hover:bg-secondary-500 hover:shadow-lg duration-300 p-3 py-2 text-sm w-full text-white rounded-md flex gap-2 justify-center items-center'
					>
						Scanner Présence
					</Link>
				</div>
			</div>
			{/* Cards */}
			<AllCardsStats
				agentInConges={agentInConges}
				agents={agents}
				attendecies={attendecies}
				paie={paie}
			/>
			{/* Charts */}
			<div className='p-5'>
				<div className='grid lg:grid-cols-3 2xl:grid-cols-6 gap-9'>
					<div className='bg-white lg:col-span-2 2xl:col-span-4 rounded-lg'>
						<div className='border-b border-gray-300 text-slate-600'>
							<div className='p-5 flex justify-between items-center'>
								<h2 className='text-lg font-medium'>Synthèse Stock</h2>
								<div className='flex gap-2 items-center'>
									<h3 className='text-sm font-light'>L&apos;an dernier</h3>
									<Switch
										className='bg-secondary-100'
										onChange={onChangeLastYear}
									/>
								</div>
							</div>
						</div>
						<div className='p-5'>
							<Column {...config} height={250} />
						</div>
					</div>
					<div className='bg-white lg:col-span-1 2xl:col-span-2 rounded-lg'>
						<div className='border-b border-gray-300 text-slate-600'>
							<div className='p-5 flex justify-between items-center'>
								<h2 className='text-lg font-medium'>Immobilisations</h2>
								<div className='flex gap-2 items-center'>
									<div>
										<Link
											href='/immob'
											className='text-sm hover:text-secondary-500 font-light flex items-center gap-2'
										>
											Plus
											<HiArrowRight />
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className='p-5'>
							<Pie {...configImmob} height={250} />
						</div>
					</div>
				</div>
			</div>
			{/* Agents table */}
			<div>
				<AgentDashboardTable data={agents} />
			</div>
		</section>
	);
};

export default PersPatr;
