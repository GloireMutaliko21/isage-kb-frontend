'use client';
import CardStat from '@/components/dashboards/PersPatr/CardStat';
import useAgents from '@/hooks/useAgents';
import useAuth from '@/hooks/useAuh';
import { BsCalendarMonth } from 'react-icons/bs';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoTodayOutline } from 'react-icons/io5';
import { MdOutlineMoneyOff } from 'react-icons/md';

export default function Home() {
	const { agents } = useAgents();
	const { isLogin } = useAuth();
	if (!isLogin)
		return <div>Veillez vous connectez pour voir vos évenements</div>;
	return (
		<main className='w-full flex flex-col'>
			<div className='border-b'>
				<h1 className='text-2xl font-semibold p-5'>Dashboard</h1>
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
					value={agents.length.toString()}
					decoration={<></>}
					icon={<BsCalendarMonth />}
				/>
				<CardStat
					title='agents présents'
					value={agents.length.toString()}
					decoration={<></>}
					icon={<IoTodayOutline />}
				/>
				<CardStat
					title='agents non payés'
					value={agents.length.toString()}
					decoration={<></>}
					icon={<MdOutlineMoneyOff />}
				/>
			</div>
		</main>
	);
}
