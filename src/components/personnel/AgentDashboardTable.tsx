import { Table, Tag } from 'antd';
import React from 'react';

const AgentDashboardTable = ({ data }: { data: User[] }) => {
	return (
		<section className='p-5'>
			<div className='bg-white p-5 rounded-lg'>
				<div className='mb-5 text-lg text-slate-600 font-semibold'>
					Liste des agents
				</div>
				<div>
					<Table
						size='small'
						pagination={{ hideOnSinglePage: true, pageSize: 8 }}
						dataSource={data}
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
								key: 'role',
								dataIndex: 'role',
								title: 'Roles',
								render: (_, user, __) => (
									<>
										{user.roles?.map((role) => {
											const returnedRole = role.title
												.substring(
													role.title.lastIndexOf(' '),
													role.title.length
												)
												.trim();
											let color =
												returnedRole == 'admin'
													? 'geekblue'
													: returnedRole == 'personnel'
													? 'cyan'
													: returnedRole == 'patrimoine'
													? 'pink'
													: 'volcano';
											return (
												<>
													<Tag
														key={`${role.id}-${user.id}-${Math.random()}`}
														color={color}
														className='2xl:hidden'
													>
														{returnedRole.substring(0, 4)}
													</Tag>
													<Tag
														key={`${role.id}-${user.id}`}
														color={color}
														className='hidden 2xl:inline-block'
													>
														{returnedRole}
													</Tag>
												</>
											);
										})}
									</>
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
									<td
										{...rest}
										className='p-2 !bg-white !text-slate-500 !font-bold'
									>
										{children}
									</td>
								),
							},
							body: {
								cell: ({
									children,
									...rest
								}: {
									children: React.ReactNode;
								}) => (
									<td {...rest} className='!text-slate-500'>
										{children}
									</td>
								),
							},
						}}
					/>
				</div>
			</div>
		</section>
	);
};

export default AgentDashboardTable;
