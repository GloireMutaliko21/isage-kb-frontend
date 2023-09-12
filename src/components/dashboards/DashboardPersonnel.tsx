import Link from 'next/link';
import React from 'react';
import AllCardsStats from './PersPatr/AllCardsStats';
import useAgents from '@/hooks/useAgents';
import useRemuneration from '@/hooks/useRemuneration';
import useConge from '@/hooks/useConge';
import useAttendency from '@/hooks/useAttendency';
import AgentDashboardTable from '../personnel/AgentDashboardTable';
import { Switch } from 'antd';
import { Line, type LineConfig } from '@ant-design/plots';
import { HiArrowRight } from 'react-icons/hi2';

const DashboardPersonnel = () => {
	const { agents } = useAgents();
	const { paie, lastSixMonthFiches, lastYearFiches } = useRemuneration();
	const { agentInConges } = useConge();
	const { attendecies } = useAttendency();

	const onChangeLastYear = (checked: boolean) => {
		if (checked) lastYearFiches();
		else lastSixMonthFiches();
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
									<div>
										<Link
											href='/attendency'
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
							{/* <Pie {...configImmob} height={250} /> */}
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
