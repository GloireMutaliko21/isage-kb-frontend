import { frenchFormattedDate } from '@/utils/dates';
import { Table, Tag } from 'antd';

const AgentsInLeave = ({ records }: { records: Conge[] }) => {
	return (
		<Table
			size='small'
			pagination={{ hideOnSinglePage: true, pageSize: 10 }}
			dataSource={records}
			columns={[
				{
					key: 'id',
					dataIndex: 'id',
					title: 'N°',
					render: (_, __, index) => index + 1,
					width: '3rem',
				},
				{
					key: 'name',
					dataIndex: 'name',
					title: 'Agent',
					align: 'center',
					ellipsis: true,
					render: (_, record, __) => <p>{record.agent?.names}</p>,
				},
				{
					key: 'startDate',
					dataIndex: 'startDate',
					title: 'Date de début',
					ellipsis: true,
					render: (_, record, __) => (
						<p>{frenchFormattedDate(record.startDate)}</p>
					),
				},
				{
					key: 'endDate',
					dataIndex: 'endDate',
					title: 'Date de fin',
					ellipsis: true,
					render: (_, record, __) => (
						<p>{frenchFormattedDate(record.endDate)}</p>
					),
				},
				{
					key: 'approved',
					dataIndex: 'approved',
					title: 'Approuvé',
					ellipsis: true,
					align: 'center',
					render: (_, record, __) => (
						<Tag color={`${record.approved ? 'blue' : 'danger'}`}>
							{record.approved ? 'Oui' : 'Non'}
						</Tag>
					),
				},
				{
					key: 'requested',
					dataIndex: 'createdAt',
					title: 'Créé/demandé le',
					ellipsis: true,
					render: (_, record, __) => (
						<p>{frenchFormattedDate(record.createdAt)}</p>
					),
				},
				{
					key: 'approved',
					dataIndex: 'updatedAt',
					title: 'Approuvé le',
					ellipsis: true,
					render: (_, record, __) => (
						<p>{frenchFormattedDate(record.updatedAt)}</p>
					),
				},
			]}
			components={{
				header: {
					cell: ({ children, ...rest }: { children: React.ReactNode }) => (
						<td {...rest} className='!p-2 !text-slate-500 !font-bold'>
							{children}
						</td>
					),
				},
			}}
		/>
	);
};

export default AgentsInLeave;
