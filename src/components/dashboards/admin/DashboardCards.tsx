import React from 'react';
import CardStat from '../PersPatr/CardStat';
import { HiOutlineUsers } from 'react-icons/hi2';
import { BsCalendarMonth } from 'react-icons/bs';
import { FaUserGraduate } from 'react-icons/fa6';

const DashboardCards = ({
	agents,
	agentInConges,
	grades,
	sections,
	attendecies,
}: {
	agents: User[];
	agentInConges: Conge[];
	grades: Grade[];
	sections: Section[];
	attendecies: Attendency[];
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
				// &&
				// new Date(a?.createdAt || '').setHours(0, 0, 0, 0) ==
				// 	new Date().setHours(0, 0, 0, 0)
			/>
			<CardStat
				title='grades'
				value={grades.length.toString()}
				decoration={
					<p>
						{agents.filter((a) => a.acadTitle?.startsWith('ESU P')!).length}{' '}
						Prof(s)
					</p>
				}
				icon={<FaUserGraduate />}
			/>

			<CardStat
				title='services'
				value={sections.length.toString()}
				decoration={<p className='-ml-1'>services</p>}
				icon={<FaUserGraduate />}
			/>
		</section>
	);
};

export default DashboardCards;
