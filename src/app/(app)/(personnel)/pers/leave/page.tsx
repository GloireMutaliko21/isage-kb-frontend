'use client';
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PageHeader from '@/components/global/PageHeader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import useConge from '@/hooks/useConge';
import AgentsInLeave from '@/components/personnel/Conge/AgentsInLeave';
import NonApproved from '@/components/personnel/Conge/NonApproved';

const Page = () => {
	const dispatch = useAppDispatch();
	const { agentInConges } = useConge();
	const CreateAttendencyButton = () => {
		return (
			<div className=''>
				<button onClick={() => dispatch(openModal({ modal_ID: 'NEW_LEAVE' }))}>
					Accorder un congé
				</button>
			</div>
		);
	};

	const tabsItems: TabsProps['items'] = [
		{
			key: '1',
			label: 'Agents en congé',
			children: <AgentsInLeave records={agentInConges} />,
		},
		{
			key: '2',
			label: 'Congés non approuvés',
			children: <NonApproved />,
		},
	];

	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title='Gestion des congés'
				actionButton={<CreateAttendencyButton />}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<Tabs defaultActiveKey='1' items={tabsItems} />
				</div>
			</section>
		</main>
	);
};

export default Page;
