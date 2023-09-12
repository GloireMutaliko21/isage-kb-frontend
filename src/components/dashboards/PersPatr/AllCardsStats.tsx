import React from 'react';
import CardStat from './CardStat';
import { HiOutlineUsers } from 'react-icons/hi2';
import { BsCalendarMonth } from 'react-icons/bs';
import { IoTodayOutline } from 'react-icons/io5';
import { MdOutlineMoneyOff } from 'react-icons/md';

const AllCardsStats = ({
	agents,
	agentInConges,
	attendecies,
	paie,
}: {
	agents: User[];
	agentInConges: Conge[];
	attendecies: Attendency[];
	paie: any;
}) => {
	return (
		<section className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-5'>
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
						{attendecies.filter((a) => a.status! == 'absent').length} absent(s)
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
		</section>
	);
};

export default AllCardsStats;
