'use client';
import Link from 'next/link';
import React from 'react';
import CardStat from './PersPatr/CardStat';
import useAgents from '@/hooks/useAgents';
import useAttendency from '@/hooks/useAttendency';
import { HiOutlineUsers } from 'react-icons/hi2';
import { BsCalendarMonth } from 'react-icons/bs';
import { IoTodayOutline } from 'react-icons/io5';
import { MdOutlineMoneyOff } from 'react-icons/md';
import useConge from '@/hooks/useConge';
import useRemuneration from '@/hooks/useRemuneration';
import { Column, type ColumnConfig } from '@ant-design/plots';
import useInventaire from '@/hooks/useInventaire';
import { columnInventaireChartData } from '@/features/inventaire';

const PersPatr = () => {
	const { agents } = useAgents();
	const { paie } = useRemuneration();
	const { agentInConges } = useConge();
	const { attendecies } = useAttendency();
	const { globalSheet } = useInventaire();

	const config: ColumnConfig = {
		data: columnInventaireChartData(globalSheet),
		isGroup: true,
		xField: 'libelle', //libelle
		yField: 'qty', //qty
		seriesField: 'operation', // typeOp
		color: ['#01579B', '#0097A7'],
		minColumnWidth: 30,
		maxColumnWidth: 30,
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
			<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-5'>
				<CardStat
					title='agents'
					value={agents.length.toString()}
					decoration={
						<p>{agents.filter((a) => a.nbChildren! > 1).length} marié(s)</p>
					}
					icon={<HiOutlineUsers />}
				/>
				<CardStat
					title='agents en congé'
					value={agentInConges.length.toString()}
					decoration={
						<p>
							{attendecies.filter((a) => a.status! == 'absent').length}{' '}
							absent(s)
						</p>
					}
					icon={<BsCalendarMonth />}
				/>
				<CardStat
					title='agents présents'
					value={attendecies
						.filter((a) => a.status === 'present')
						.length.toString()}
					decoration={
						<p>
							{attendecies.filter((a) => a.status! == 'retard').length} retards
						</p>
					}
					icon={<IoTodayOutline />}
				/>
				<CardStat
					title='agents non payés'
					value={paie.slipList.unpaid.length?.toString() || '0'}
					decoration={<p>{paie.slipList.liste?.length} payé(s)</p>}
					icon={<MdOutlineMoneyOff />}
				/>
			</div>
			<div>
				<Column {...config} />
			</div>
		</section>
	);
};

export default PersPatr;
