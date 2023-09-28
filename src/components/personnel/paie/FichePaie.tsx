import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
	getFamAllocPerAgent,
	getPaySlipPerAgent,
	getPrimeAgent,
	getPrimeLibelle,
	getRemDaysCongePerAgent,
	getRemDaysFeriePerAgent,
	getRemMaladAccPerAgent,
	getSalDeducPerAgent,
	getSalDeducPerAgentLibelle,
	getSuppHourAgent,
} from '@/redux/remuneration/remuneration.slice';
import { Card, Tag } from 'antd';
import { useEffect } from 'react';

const FichePaie = ({
	agentId,
	year,
	month,
}: {
	agentId?: string;
	year: number;
	month: number;
}) => {
	const {
		slipList,
		allocation,
		deduction,
		hsupp,
		prime,
		remConge,
		remFerie,
		remMalad,
		status,
	} = useAppSelector((state) => state.remuneration);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (agentId) {
			dispatch(
				getPaySlipPerAgent({
					id: agentId,
					month: month ?? new Date().getMonth() + 1,
					year: year ?? new Date().getFullYear(),
				})
			);
			dispatch(
				getRemMaladAccPerAgent({
					id: agentId,
					month: month ?? new Date().getMonth() + 1,
					year: year ?? new Date().getFullYear(),
				})
			);
			dispatch(
				getFamAllocPerAgent({
					id: agentId,
					month: month ?? new Date().getMonth() + 1,
					year: year ?? new Date().getFullYear(),
				})
			);
			dispatch(
				getSalDeducPerAgent({
					id: agentId,
					month: month ?? new Date().getMonth() + 1,
					year: year ?? new Date().getFullYear(),
				})
			);
			dispatch(
				getSuppHourAgent({
					id: agentId,
					month: month ?? new Date().getMonth() + 1,
					year: year ?? new Date().getFullYear(),
				})
			);
			dispatch(
				getPrimeAgent({
					id: agentId,
					month: month ?? new Date().getMonth() + 1,
					year: year ?? new Date().getFullYear(),
				})
			);
			dispatch(
				getRemDaysCongePerAgent({
					id: agentId,
					month: month ?? new Date().getMonth() + 1,
					year: year ?? new Date().getFullYear(),
				})
			);
			dispatch(
				getRemDaysFeriePerAgent({
					id: agentId,
					month: month ?? new Date().getMonth() + 1,
					year: year ?? new Date().getFullYear(),
				})
			);
			dispatch(
				getSalDeducPerAgentLibelle({
					id: agentId,
					month: month ?? new Date().getMonth() + 1,
					year: year ?? new Date().getFullYear(),
				})
			);
			dispatch(
				getPrimeLibelle({
					id: agentId,
					month: month ?? new Date().getMonth() + 1,
					year: year ?? new Date().getFullYear(),
				})
			);
		}
	}, [agentId, year, month, dispatch]);
	const { fiche } = slipList;

	return (
		<>
			{fiche ? (
				<section className='text-slate-500'>
					<div className='flex justify-between items-center'>
						{fiche?.agent ? (
							<div className='font-bold'>
								Fiche de paie de l&apos;agent :{' '}
								<span className='text-slate-700'>{fiche.agent?.names}</span>
							</div>
						) : (
							<div className='text-red-500'>Agent {} non payé ce mois</div>
						)}
						<div>
							{!fiche?.agent ? (
								<div className='p-px border border-secondary-600 rounded-md'>
									<button className='bg-secondary-600 hover:bg-secondary-500 hover:shadow-lg duration-300 p-3 py-1 text-sm text-white rounded-md flex gap-2 justify-center items-center'>
										Payer ce mois
									</button>
								</div>
							) : (
								<div className='text-red-500'>Agent déjà payé pour ce mois</div>
							)}
						</div>
					</div>

					{/* Quand l'agent n'est pas encore payé pour le mois sélectionné */}
					{!fiche.agent && (
						<div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mt-5'>
							<Card size='small' title='Jrs maladie ou accident'>
								<div className='flex justify-between font-semibold text-slate-600'>
									<div className='flex gap-2 items-center'>
										<span>Jours prestés: </span>
										<span>{remMalad.total?.days}</span>
									</div>
									<Tag color='geekblue'>
										<div className='flex gap-2 items-center'>
											<span>Total: </span>
											<span>{remMalad.total?.total}</span>
										</div>
									</Tag>
								</div>
							</Card>
							<Card size='small' title='Allocations familiales'>
								<div>
									<div className='flex justify-between font-semibold text-slate-600'>
										<div className='flex gap-2 items-center'>
											<span>Nbre jrs: </span>
											<span>{allocation.total?.days}</span>
										</div>
										<div className='flex gap-2 items-center'>
											<span>Nbre enf.: </span>
											<span>{allocation.total?.nbEnfant}</span>
										</div>
									</div>
									<div className='flex justify-end mt-1 font-semibold text-slate-600'>
										<Tag color='geekblue'>
											<div className='flex gap-2 items-center'>
												<span>Total: </span>
												<span>{allocation.total?.total}</span>
											</div>
										</Tag>
									</div>
								</div>
							</Card>
							<Card size='small' title='Heures supplémentaires'>
								<div className='flex justify-between font-semibold text-slate-600'>
									<div className='flex gap-2 items-center'>
										<span>Heures prestées: </span>
										<span>{hsupp.total?.hours}</span>
									</div>
									<Tag color='geekblue'>
										<div className='flex gap-2 items-center'>
											<span>Total: </span>
											<span>{hsupp.total?.total}</span>
										</div>
									</Tag>
								</div>
							</Card>
							<Card size='small' title='Jours de congé'>
								<div className='flex justify-between font-semibold text-slate-600'>
									<div className='flex gap-2 items-center'>
										<span>Jours prestés: </span>
										<span>{remConge.total?.days}</span>
									</div>
									<Tag color='geekblue'>
										<div className='flex gap-2 items-center'>
											<span>Total: </span>
											<span>{remConge.total?.total}</span>
										</div>
									</Tag>
								</div>
							</Card>
							<Card size='small' title='Jours fériés/chômés'>
								<div className='flex justify-between font-semibold text-slate-600'>
									<div className='flex gap-2 items-center'>
										<span>Jours prestés: </span>
										<span>{remFerie.total?.days}</span>
									</div>
									<Tag color='geekblue'>
										<div className='flex gap-2 items-center'>
											<span>Total: </span>
											<span>{remFerie.total?.total}</span>
										</div>
									</Tag>
								</div>
							</Card>
							<Card size='small' title='Primes et gratifications'>
								<div>
									{prime.synthese.map((prime) => (
										<div
											key={prime.libelle}
											className='flex justify-between font-semibold text-slate-600'
										>
											<div>
												<span>{prime.libelle}</span>
											</div>
											<div>
												<span>{prime._sum.amount}</span>
											</div>
										</div>
									))}
									<div className='flex justify-end mt-1 font-semibold text-slate-600'>
										<Tag color='geekblue'>
											<div className='flex gap-2 items-center'>
												<span>Total: </span>
												<span>{prime.total?.total}</span>
											</div>
										</Tag>
									</div>
								</div>
							</Card>
							<Card size='small' title='Déductions et retenus'>
								<div>
									{deduction.synthese.map((deduc) => (
										<div
											key={deduc.libelle}
											className='flex justify-between font-semibold text-slate-600'
										>
											<div>
												<span>{deduc.libelle}</span>
											</div>
											<div>
												<span>{deduc._sum.amount}</span>
											</div>
										</div>
									))}
									<div className='flex justify-end mt-1 font-semibold text-slate-600'>
										<Tag color='geekblue'>
											<div className='flex gap-2 items-center'>
												<span>Total: </span>
												<span>{deduction.total?.total}</span>
											</div>
										</Tag>
									</div>
								</div>
							</Card>
						</div>
					)}
				</section>
			) : (
				<></>
			)}
		</>
	);
};

export default FichePaie;
