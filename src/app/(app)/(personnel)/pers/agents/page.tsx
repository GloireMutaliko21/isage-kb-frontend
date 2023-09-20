'use client';
import PageHeader from '@/components/global/PageHeader';
import useAgents from '@/hooks/useAgents';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import { Table } from 'antd';
import Link from 'next/link';
import { PiDownloadSimpleFill } from 'react-icons/pi';

const Agents = () => {
	const { agents, status } = useAgents();
	const dispatch = useAppDispatch();

	const CreateAgentButton = () => {
		return (
			<div className=''>
				<button onClick={() => dispatch(openModal({ modal_ID: 'NEW_AGENTS' }))}>
					Ajouter un agent
				</button>
			</div>
		);
	};
	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title='Gestion des agents'
				actionButton={<CreateAgentButton />}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<div className='w-full justify-between items-center mb-5'>
						<button className='flex gap-3 items-center rounded-md hover:shadow-lg duration-300 bg-secondary-700 px-4 py-2 text-white'>
							<PiDownloadSimpleFill className='text-xl' />
							<span>Exporter la liste</span>
						</button>
						<div></div>
					</div>

					<Table
						size='small'
						pagination={{ hideOnSinglePage: true, pageSize: 12 }}
						dataSource={agents}
						columns={[
							{
								key: 'id',
								dataIndex: 'id',
								title: 'N°',
								render: (_, __, index) => index + 1,
								width: '3rem',
							},
							{
								key: 'matricule',
								dataIndex: 'matricule',
								title: 'Matricule',
								ellipsis: true,
							},
							{
								key: 'names',
								dataIndex: 'names',
								title: 'Noms',
								ellipsis: true,
							},
							{
								key: 'grade',
								dataIndex: 'grade',
								title: 'Titre académique',
								render: (_, user, __) => user.grade?.title,
								ellipsis: true,
							},
							{
								key: 'function',
								dataIndex: 'function',
								title: 'Fonction',
								ellipsis: true,
							},
							{
								key: 'email',
								dataIndex: 'email',
								title: 'Adresse Mail',
								ellipsis: true,
							},
							{
								key: 'sex',
								dataIndex: 'sex',
								title: 'Sexe',
								ellipsis: true,
							},
							{
								key: 'sex',
								dataIndex: 'sex',
								title: '',
								render: (_, user, __) => (
									<Link
										href={`./agents/${user.id}`}
										className='border border-primary-600 text-primary-600 flex justify-center hover:text-primary-800 py-px'
									>
										Détails
									</Link>
								),
								ellipsis: true,
							},
						]}
						components={{
							header: {
								cell: ({
									children,
									...rest
								}: {
									children: React.ReactNode;
								}) => (
									<td {...rest} className='!p-2 !text-slate-500 !font-bold'>
										{children}
									</td>
								),
							},
						}}
					/>
				</div>
			</section>
		</main>
	);
};

export default Agents;
