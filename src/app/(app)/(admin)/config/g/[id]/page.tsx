'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useAuth from '@/hooks/useAuh';
import { getGradeById } from '@/redux/grade/grade.slice';
import PageHeader from '@/components/global/PageHeader';
import {
	Avatar,
	List,
	Divider,
	Table,
	type TableProps,
	Input,
	Button,
	Card,
	Tag,
} from 'antd';
import { CiEdit } from 'react-icons/ci';
import { EditFilled } from '@ant-design/icons';

const Singlegrade = ({ params }: { params: { id: string } }) => {
	const { selectedGrade, status } = useAppSelector((state) => state.grade);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();
	useEffect(() => {
		if (isLogin) dispatch(getGradeById(params.id));
	}, []);

	const [editingTitle, seteditingTitle] = useState(false);
	const [editingBaseSalary, setEditingBaseSalary] = useState(false);

	const tableProps: TableProps<any> = {
		pagination: false,
		components: {
			body: {
				cell: ({ children }: { children: React.ReactNode }) => (
					<td className='!border-0 !align-top !bg-transparent !text-slate-600'>
						{children}
					</td>
				),
				row: ({ children }: { children: React.ReactNode }) => (
					<tr className='hover:!bg-transparent !bg-transparent'>{children}</tr>
				),
			},
		},
		size: 'middle',
		showHeader: false,
		className: '[&_.ant-table]:bg-transparent',
	};

	const rateData =
		selectedGrade?.rate! &&
		Object.entries(selectedGrade?.rate!).map(([key, value]) => ({
			title: key,
			value,
		}));

	return (
		<main className='flex flex-col h-full'>
			<PageHeader title={`Grade : ${selectedGrade?.title}`} />
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<div className='grid lg:grid-cols-2 gap-x-10 divide-x'>
						{/* Informations generales */}
						<div>
							<div>
								<Divider
									orientation='left'
									orientationMargin={0}
									className='text-lg !font-bold !text-slate-700'
								>
									Informations générales
								</Divider>
								<div>
									<Table
										{...tableProps}
										columns={[
											{ dataIndex: 'dataKey', className: 'w-[3rem]' },
											{ dataIndex: 'dataValue' },
										]}
										dataSource={[
											{
												dataKey: 'Titre : ',
												dataValue: editingTitle ? (
													<div className='flex gap-4 w-3/4 2xl:w-1/2'>
														<Input
															type='text'
															// value={newCompanyName}
															// onChange={(e) => setNewCompanyName(e.target.value)}
														/>
														<Button
														// onClick={() => handleSaveUpdate('denomination')}
														>
															Save
														</Button>
														<Button onClick={() => seteditingTitle(false)}>
															Cancel
														</Button>
													</div>
												) : (
													<div className='flex gap-4 items-center'>
														<span>{selectedGrade?.title}</span>
														<span className='text-xl cursor-pointer hover:text-primary-800 duration-500'>
															<CiEdit onClick={() => seteditingTitle(true)} />
														</span>
													</div>
												),
											},
											{
												dataKey: 'Salaire de base : ',
												dataValue: editingBaseSalary ? (
													<div className='flex gap-4 w-3/4 2xl:w-1/2'>
														<Input
															type='number'
															// value={newCompanyName}
															// onChange={(e) => setNewCompanyName(e.target.value)}
														/>
														<Button
														// onClick={() => handleSaveUpdate('denomination')}
														>
															Save
														</Button>
														<Button onClick={() => setEditingBaseSalary(false)}>
															Cancel
														</Button>
													</div>
												) : (
													<div className='flex gap-4 items-center'>
														<span className='text-xl font-semibold text-secondary-700'>
															{selectedGrade?.baseSalary}
														</span>
														<span className='text-xl cursor-pointer hover:text-primary-800 duration-500'>
															<CiEdit
																onClick={() => setEditingBaseSalary(true)}
															/>
														</span>
													</div>
												),
											},
										]}
									/>
								</div>
								<div>
									{/* Pay rates */}
									<div>
										<Divider
											orientation='left'
											orientationMargin={0}
											className='text-lg !font-bold !text-slate-700'
										>
											Taux de rémunération
										</Divider>
										<List
											grid={{
												gutter: 16,
												xs: 1,
												sm: 2,
												md: 2,
												lg: 2,
												xl: 2,
												xxl: 3,
											}}
											dataSource={rateData}
											renderItem={(item) => (
												<List.Item>
													<Card
														size='small'
														title={
															<p className='capitalize text-slate-500'>
																{item.title}
															</p>
														}
													>
														<div className='flex justify-between mx-4'>
															<p className='font-bold text-slate-600'>
																{item.value}
															</p>
															<CiEdit
																onClick={() => seteditingTitle(true)}
																className='text-xl cursor-pointer text-slate-500 hover:text-secondary-600'
															/>
														</div>
													</Card>
												</List.Item>
											)}
										/>
									</div>
								</div>
							</div>
						</div>
						{/* Agents */}
						<div className='pl-10'>
							<div>
								<Divider
									orientation='left'
									orientationMargin={0}
									className='text-lg !font-bold !text-slate-700'
								>
									Agents associés
								</Divider>
							</div>
							<List
								pagination={{
									position: 'bottom',
									align: 'end',
									pageSize: 3,
									size: 'small',
								}}
								dataSource={selectedGrade?.agents}
								renderItem={(agent, index) => (
									<List.Item key={agent.id}>
										<List.Item.Meta
											avatar={
												<Avatar
													src={`${
														agent.imgUrl ||
														'https://xsgames.co/randomusers/assets/avatars/pixel/0.jpg'
													}`}
												/>
											}
											title={<p className='font-medium'>{agent.names}</p>}
											description={agent.email}
										/>
									</List.Item>
								)}
							/>
							<Divider
								orientation='left'
								orientationMargin={0}
								className='text-lg !font-bold !text-slate-700'
							>
								Eléments dossier associés
							</Divider>
							<List
								size='large'
								pagination={{
									size: 'small',
									align: 'end',
									position: 'bottom',
									pageSize: 2,
								}}
								bordered
								dataSource={selectedGrade?.folderElements!}
								renderItem={(item) => (
									<List.Item>
										<Tag color='cyan'>{item.title}</Tag>
									</List.Item>
								)}
							/>
							<button className='bg-secondary-600 hover:shadow-lg p-3 py-2 text-sm mt-5 text-white rounded-md flex gap-2 justify-center items-center'>
								Modifier
							</button>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Singlegrade;
