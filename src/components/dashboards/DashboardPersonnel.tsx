import Link from 'next/link';
import React from 'react';
import AllCardsStats from './PersPatr/AllCardsStats';
import useAgents from '@/hooks/useAgents';
import useRemuneration from '@/hooks/useRemuneration';
import useConge from '@/hooks/useConge';
import useAttendency from '@/hooks/useAttendency';
import AgentDashboardTable from '../personnel/AgentDashboardTable';

const DashboardPersonnel = () => {
	const { agents } = useAgents();
	const { paie } = useRemuneration();
	const { agentInConges } = useConge();
	const { attendecies } = useAttendency();
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
			{/* Agents table */}
			<AgentDashboardTable data={agents} />
		</section>
	);
};

export default DashboardPersonnel;
