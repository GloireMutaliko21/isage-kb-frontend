'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useAuth from '@/hooks/useAuh';
import PageHeader from '@/components/global/PageHeader';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import { getAgentById } from '@/redux/agents/agents.slice';
import { Button, Descriptions, Divider, Empty, Form, Tag } from 'antd';
import { frenchFormattedDate } from '@/utils/dates';
import {
	createAgentFile,
	updateAgentFile,
} from '@/redux/agent-files/agent-files.slice';
import { MdOutlineCancel } from 'react-icons/md';

const SingleAgent = ({ params }: { params: { id: string } }) => {
	const [editingData, setEditingData] = useState({
		agentFolderElement: false,
		missingFile: false,
	});
	const [indexOfAgentFoldEl, setIndexOfAgentFoldEl] = useState<number | null>();
	const [indexOfMissingFile, setIndexOfMissingFile] = useState<number | null>();
	const [agentFile, setAgentFile] = useState<File | null>();
	const [agentMissing, setAgentMissing] = useState<File | null>();
	const handleChangeImage = (e: any) => {
		setAgentFile(e.target.files[0]);
	};
	const handleChangeMissingFile = (e: any) => {
		setAgentMissing(e.target.files[0]);
	};

	const {
		selectedAgent,
		status: agentStatus,
		message,
	} = useAppSelector((state) => state.agents);
	const { status: fileSatus } = useAppSelector((state) => state.agentFiles);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();
	useEffect(() => {
		if (isLogin) dispatch(getAgentById(params.id));
	}, [fileSatus]);
	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title={`${
					selectedAgent
						? "Informations de l'agent : " + selectedAgent.names
						: ''
				}`}
				actionButton={<Link href='.'>Retour</Link>}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					{!selectedAgent ? (
						<div className='w-full h-full flex justify-center items-center'>
							<Empty description={<span>{message}</span>} />
						</div>
					) : (
						<div>
							<div>
								<Divider
									orientation='left'
									orientationMargin={0}
									className='text-lg !font-bold !text-slate-700'
								>
									Informations générales
								</Divider>
								<div className='ml-5 lg:ml-10'>
									<div className='grid lg:grid-cols-2 gap-5'>
										<Descriptions
											title='Informations personnelles'
											size='small'
											column={1}
											items={[
												{
													key: '1',
													label: 'Noms',
													children: selectedAgent.names,
												},
												{
													key: '2',
													label: 'Adresse mail',
													children: selectedAgent.email,
												},
												{
													key: '3',
													label: 'Sexe',
													children: selectedAgent.sex,
												},
												{
													key: '4',
													label: "Nombre d'enfants",
													children: selectedAgent.nbChildren,
												},
												{
													key: '5',
													label: 'Date de naissance',
													children: `${frenchFormattedDate(
														selectedAgent.birthDate
													)}`,
												},
												{
													key: '6',
													label: "Nom d'utilisateur",
													children: selectedAgent.username,
												},
												{
													key: '7',
													label: 'Contacts',
													children: `${selectedAgent.contacts.phone ?? ''}, ${
														selectedAgent.contacts.other ?? ''
													}`,
												},
												{
													key: '8',
													label: 'Addresse',
													children: selectedAgent.contacts.address ?? '',
												},
											]}
										/>
										<Descriptions
											title='Informations académiques'
											size='small'
											column={1}
											items={[
												{
													key: '9',
													label: 'Matricule',
													children: (
														<Tag color='cyan'>{selectedAgent.matricule}</Tag>
													),
												},
												{
													key: '10',
													label: 'Grade',
													children: selectedAgent.grade?.title,
												},
												{
													key: '11',
													label: 'Fonction',
													children: selectedAgent.function,
												},
												{
													key: '12',
													label: 'Titre académique',
													children: selectedAgent.acadTitle,
												},
												{
													key: '13',
													label: 'Statut',
													children: selectedAgent.status,
												},
												{
													key: '14',
													label: "Date d'engagement",
													children: `${frenchFormattedDate(
														selectedAgent.engagDate
													)}`,
												},
												{
													key: '15',
													label: 'Date de dernière ppromotion',
													children: `${
														selectedAgent.promDate
															? frenchFormattedDate(selectedAgent.promDate)
															: frenchFormattedDate(selectedAgent.engagDate)
													}`,
												},
												{
													key: '16',
													label: 'Numéro SIFA',
													children: selectedAgent.sifa,
												},
											]}
										/>
									</div>
								</div>
							</div>
							<div>
								<Divider
									orientation='left'
									orientationMargin={0}
									className='text-lg !font-bold !text-slate-700'
								>
									Dossier
								</Divider>
								<div className='ml-5 lg:ml-10'>
									<div className='grid lg:grid-cols-2 gap-5'>
										<Descriptions
											title='Dossiers présents'
											size='small'
											column={1}
											items={selectedAgent.folderElements?.map(
												(
													{
														agentId,
														folderElement,
														folderElementId,
														public_id,
														url,
													},
													i
												) => ({
													key: folderElementId,
													label: 'Désignation',
													children: (
														<div>
															<div className='flex gap-2 items-center flex-wrap'>
																<Tag color='processing'>
																	{folderElement.title}
																</Tag>
																<a
																	href={url}
																	target='_blank'
																	className='border border-secondary-700 rounded px-4 min-w-max'
																>
																	Afficher
																</a>
																{(!editingData.agentFolderElement ||
																	i != indexOfAgentFoldEl) && (
																	<Button
																		size='small'
																		onClick={() => {
																			setEditingData({
																				...editingData,
																				agentFolderElement: true,
																			});
																			setIndexOfAgentFoldEl(i);
																		}}
																	>
																		Modifier
																	</Button>
																)}
															</div>
															<div className='mt-2'>
																{editingData.agentFolderElement &&
																	i == indexOfAgentFoldEl && (
																		<Form
																			layout='inline'
																			size='small'
																			// className='-mb-5'
																			onFinish={(v) => {
																				dispatch(
																					updateAgentFile({
																						agentId,
																						folderElementId,
																						public_id,
																						file: agentFile,
																					})
																				);
																			}}
																		>
																			<Form.Item name='file'>
																				<input
																					type='file'
																					onChange={handleChangeImage}
																					className='w-[164px]'
																				/>
																			</Form.Item>
																			<Form.Item>
																				<div className='flex gap-2'>
																					<Button
																						disabled={agentFile ? false : true}
																						htmlType='submit'
																						loading={fileSatus.isLoading}
																					>
																						OK
																					</Button>
																					<Button
																						danger
																						onClick={() => {
																							setEditingData({
																								...editingData,
																								agentFolderElement: false,
																							});
																							setIndexOfAgentFoldEl(null);
																							setAgentFile(null);
																						}}
																					>
																						<MdOutlineCancel />
																					</Button>
																				</div>
																			</Form.Item>
																		</Form>
																	)}
															</div>
														</div>
													),
												})
											)}
										/>
										<Descriptions
											title='Eléments de dossier manquants'
											size='small'
											column={1}
											items={selectedAgent.missingAgentFiles?.map((fl, i) => ({
												key: fl.id,
												label: 'Elément',
												children: (
													<div>
														<div className='flex gap-2 items-center flex-wrap'>
															<Tag color='warning'>{fl.title}</Tag>
															{(!editingData.missingFile ||
																i != indexOfMissingFile) && (
																<Button
																	size='small'
																	onClick={() => {
																		setEditingData({
																			...editingData,
																			missingFile: true,
																		});
																		setIndexOfMissingFile(i);
																	}}
																>
																	Ajouter
																</Button>
															)}
														</div>
														<div className='mt-2'>
															{editingData.missingFile &&
																i == indexOfMissingFile && (
																	<Form
																		layout='inline'
																		size='small'
																		onFinish={(v) => {
																			dispatch(
																				createAgentFile({
																					agentId: selectedAgent.id,
																					folderElementId: fl.id,
																					file: agentMissing,
																				})
																			);
																		}}
																	>
																		<Form.Item name='file'>
																			<input
																				type='file'
																				onChange={handleChangeMissingFile}
																				className='w-[164px]'
																			/>
																		</Form.Item>
																		<Form.Item>
																			<div className='flex gap-2'>
																				<Button
																					disabled={agentMissing ? false : true}
																					htmlType='submit'
																					loading={fileSatus.isLoading}
																				>
																					OK
																				</Button>
																				<Button
																					danger
																					onClick={() => {
																						setEditingData({
																							...editingData,
																							missingFile: false,
																						});
																						setIndexOfAgentFoldEl(null);
																						setAgentMissing(null);
																					}}
																				>
																					<MdOutlineCancel />
																				</Button>
																			</div>
																		</Form.Item>
																	</Form>
																)}
														</div>
													</div>
												),
											}))}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default SingleAgent;
