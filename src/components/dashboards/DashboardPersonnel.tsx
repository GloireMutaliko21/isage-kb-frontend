import Link from 'next/link';
import React from 'react';
import AllCardsStats from './PersPatr/AllCardsStats';
import useAgents from '@/hooks/useAgents';
import useRemuneration from '@/hooks/useRemuneration';
import useConge from '@/hooks/useConge';
import useAttendency from '@/hooks/useAttendency';
import AgentDashboardTable from '../personnel/AgentDashboardTable';
import { Switch } from 'antd';
import { Line, type PieConfig, type LineConfig, Pie } from '@ant-design/plots';
import { dashBoardPieChartData } from '@/features/attendency';

const DashboardPersonnel = () => {
	const { agents } = useAgents();
	const { paie, lastSixMonthFiches, lastYearFiches } = useRemuneration();
	const { agentInConges } = useConge();
	const { attendecies, getDailyAttends, lastMonthAttends } = useAttendency();

	const onChangeLastYear = (checked: boolean) => {
		if (checked) lastYearFiches();
		else lastSixMonthFiches();
	};

	const onChangeAttendChart = (checked: boolean) => {
		if (checked) lastMonthAttends();
		else getDailyAttends();
	};

	const config: LineConfig = {
		data: paie.slipList?.paySlips,
		padding: 'auto',
		xField: 'mois',
		yField: 'total',
		xAxis: {
			tickCount: 5,
		},
		smooth: true,
	};

	const configPieAttend: PieConfig = {
		appendPadding: 10,
		data: dashBoardPieChartData(attendecies),
		angleField: 'total',
		colorField: 'Category',
		radius: 1,
		innerRadius: 0.6,
		color: ['#ff8935', '#01579B', '#0097A7', '#5b39ac', '#4DD0E1'],
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
				content: 'Présences',
			},
		},
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
								<h2 className='text-lg font-medium'>Paie des agents</h2>
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
							<Line {...config} height={250} />
						</div>
					</div>
					<div className='bg-white lg:col-span-1 2xl:col-span-2 rounded-lg'>
						<div className='border-b border-gray-300 text-slate-600'>
							<div className='p-5 flex justify-between items-center'>
								<h2 className='text-lg font-medium'>Présences</h2>
								<div className='flex gap-2 items-center'>
									<h3 className='text-sm font-light'>Mois dernier</h3>
									<Switch
										className='bg-secondary-100'
										onChange={onChangeAttendChart}
									/>
								</div>
							</div>
						</div>
						<div className='p-5'>
							<Pie {...configPieAttend} height={250} />
						</div>
					</div>
				</div>
			</div>
			{/* Agents table */}
			<AgentDashboardTable data={agents} />
		</section>
	);
};

export default DashboardPersonnel;
