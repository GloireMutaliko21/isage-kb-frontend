'use client';
import { DatePicker, Select, Tabs, type TabsProps } from 'antd';

import PageHeader from '@/components/global/PageHeader';
import useAgents from '@/hooks/useAgents';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import FichePaie from '@/components/personnel/paie/FichePaie';
import PaieDetails from '@/components/personnel/paie/PaieDetails';
import Unpaid from '@/components/personnel/paie/Unpaid';
import {
	setAgentToPayId,
	setYearAndMonth,
} from '@/redux/remuneration/remuneration.slice';
import { useAppSelector } from '@/hooks/useAppSelector';

const Page = () => {
	const { agents } = useAgents();
	const dispatch = useAppDispatch();
	const { params } = useAppSelector((state) => state.remuneration);
	const { agentId, month, year } = params;
	const onChangeDateChange = (date: any) => {
		if (date) dispatch(setYearAndMonth({ month: date.$M + 1, year: date.$y }));
	};

	const onAgentIdChange = (value: string) => {
		dispatch(setAgentToPayId(value));
	};
	const GeneratePayrollButton = () => {
		return (
			<div>
				<button onClick={() => dispatch(openModal({ modal_ID: 'PAYROLL' }))}>
					Générer la liste de paie
				</button>
			</div>
		);
	};

	const tabsItems: TabsProps['items'] = [
		{
			key: '1',
			label: 'Fiche de paie',
			children: <FichePaie agentId={agentId} month={month!} year={year!} />,
		},
		{
			key: '2',
			label: 'Détails de rémunération',
			children: <PaieDetails />,
		},
		{
			key: '3',
			label: 'Agents non payés',
			children: <Unpaid />,
		},
	];

	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title='Gestion des rémunérations'
				actionButton={<GeneratePayrollButton />}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<div className='flex justify-end gap-5 z-10'>
						<DatePicker
							onChange={onChangeDateChange}
							picker='month'
							placeholder='Sélection mois'
							format={'MM-YYYY'}
						/>
						<div>
							<Select
								optionLabelProp='label'
								placeholder='Sélectionner agent'
								showSearch
								onChange={onAgentIdChange}
								filterOption={(input, option) =>
									(option?.label ?? '').includes(input) ||
									(option?.label ?? '').toLowerCase().includes(input) ||
									(option?.label ?? '').toUpperCase().includes(input)
								}
								filterSort={(optionA, optionB) =>
									(optionA?.label ?? '')
										.toLowerCase()
										.localeCompare((optionB?.label ?? '').toLowerCase())
								}
								options={agents.map((agent) => ({
									label: agent.names,
									value: agent.id,
								}))}
								className='w-52'
							/>
						</div>
					</div>
					<Tabs
						defaultActiveKey='1'
						items={tabsItems}
						size='small'
						tabBarStyle={{ maxWidth: 'max-content', marginTop: '-35px' }}
					/>
				</div>
			</section>
		</main>
	);
};

export default Page;
