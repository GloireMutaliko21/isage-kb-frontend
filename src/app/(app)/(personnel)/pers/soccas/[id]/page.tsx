'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import useAuth from '@/hooks/useAuh';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getOneSocialCase } from '@/redux/social-case/social-case.slice';
import { useAppSelector } from '@/hooks/useAppSelector';
import PageHeader from '@/components/global/PageHeader';
import { Descriptions, Divider, Empty, Tag } from 'antd';
import { frenchFormattedDate } from '../../../../../../utils/dates';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';

const Page = ({ params }: { params: { id: string } }) => {
	const { isLogin } = useAuth();
	const dispatch = useAppDispatch();
	const { selectedSocialCase, status, message } = useAppSelector(
		(state) => state.socialCase
	);
	useEffect(() => {
		if (isLogin) dispatch(getOneSocialCase(params.id));
	}, []);

	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title={'Cas social'}
				actionButton={<Link href='.'>Retour</Link>}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					{!selectedSocialCase ? (
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
							</div>
							<div className='ml-5 lg:ml-10'>
								<Descriptions
									size='small'
									column={1}
									items={[
										{
											key: '1',
											label: 'Description',
											children: selectedSocialCase.description,
										},
										{
											key: '2',
											label: 'Statut',
											children: (
												<Tag
													color={`${
														selectedSocialCase.status == 'published'
															? 'blue'
															: 'error'
													}`}
												>
													{selectedSocialCase.status}
												</Tag>
											),
										},
										{
											key: '3',
											label: 'Validité',
											children: (
												<Tag
													color={`${
														selectedSocialCase.validity == 'inProgress'
															? 'green'
															: 'error'
													}`}
												>
													{selectedSocialCase.validity}
												</Tag>
											),
										},
										{
											key: '4',
											label: 'A clôturer',
											children: frenchFormattedDate(selectedSocialCase.endDate),
										},
										{
											key: '5',
											label: 'Agent concerné',
											children: (
												<p className='text-secondary-600 font-semibold'>
													{selectedSocialCase.agent?.names}
												</p>
											),
										},
									]}
								/>
							</div>
							<Divider
								orientation='left'
								orientationMargin={0}
								className='text-lg !font-bold !text-slate-700'
							>
								Souscriptions
							</Divider>
							<div className='ml-5 lg:ml-10'>
								<Descriptions
									size='small'
									column={1}
									items={selectedSocialCase.casSocSubscriptions?.map(
										(subsc) => ({
											key: subsc.id,
											label: subsc.agent?.names,
											children: subsc.montant,
										})
									)}
								/>
							</div>
							<div className='flex justify-end my-6 border-t pt-5'>
								<p className='font-bold text-secondary-700 pr-3'>
									Total :{' '}
									{selectedSocialCase.casSocSubscriptions?.reduce(
										(a, c) => a + parseInt(c.montant.toString()),
										0
									)}
								</p>
							</div>
							<Divider
								orientation='left'
								orientationMargin={0}
								className='text-lg !font-bold !text-slate-700'
							>
								Actions
							</Divider>
							<div className='flex justify-end'>
								<button
									onClick={() =>
										dispatch(openModal({ modal_ID: 'UPDATE_SOCCASE' }))
									}
									className='bg-secondary-600 hover:shadow-lg p-3 py-2 text-sm text-white rounded-md flex gap-2 justify-center items-center'
								>
									Modifier le cas social
								</button>
							</div>
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default Page;
