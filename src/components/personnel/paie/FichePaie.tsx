import { generatePaySlip } from '@/docs/paySlip';
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
	registerPaySlip,
} from '@/redux/remuneration/remuneration.slice';
import {
	alloc,
	baseSalary,
	deductionData,
	joursConge,
	joursFeries,
	joursMaladAcc,
	primes,
	suppHours,
} from '@/utils/formatPaySlipData';
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
	const { fiche, created } = slipList;

	useEffect(() => {
		if (created && created.agent) {
			generatePaySlip('#table', created?.agent);
		}
	}, [created, dispatch]);

	const totBrut =
		baseSalary(created).total +
		suppHours(created).total +
		joursFeries(created).total +
		joursConge(created).total +
		joursMaladAcc(created).total +
		primes(created).total;

	const submitPay = async () => {
		dispatch(registerPaySlip({ agentId: agentId!, month, year }));
	};

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
									<button
										onClick={submitPay}
										className='bg-secondary-600 hover:bg-secondary-500 hover:shadow-lg duration-300 p-3 py-1 text-sm text-white rounded-md flex gap-2 justify-center items-center'
									>
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
							<div className='hidden'>
								{created && (
									<table id='table' className='w-full'>
										<tbody>
											{/* Salaire de base */}
											<tr>
												<td className='px-3 w-1/3 font-bold' rowSpan={3}>
													Salaire de base
												</td>
												<td className='px-3 w-1/3 text-slate-500'>Taux</td>
												<td className='px-3 w-1/3'>
													{baseSalary(created).rate}
												</td>
											</tr>
											<tr>
												<td className='px-3 w-1/3 text-slate-500'>Base</td>
												<td className='px-3 w-1/3'>
													{baseSalary(created).base}
												</td>
											</tr>
											<tr className='bg-secondary-50 font-extrabold text-slate-700'>
												<td className='px-3 w-1/3'>Total</td>
												<td className='px-3 w-1/3'>
													{baseSalary(created).total}
												</td>
											</tr>

											{/* Heures supp */}
											<tr>
												<td className='px-3 w-1/3 font-bold' rowSpan={3}>
													Heures supplémentaires
												</td>
												<td className='px-3 w-1/3 text-slate-500'>
													Nombre d&apos;heures
												</td>
												<td className='px-3 w-1/3'>
													{suppHours(created).hours}
												</td>
											</tr>
											<tr>
												<td className='px-3 w-1/3 text-slate-500'>Taux</td>
												<td className='px-3 w-1/3'>
													{suppHours(created).rate}
												</td>
											</tr>
											<tr className='bg-secondary-50 font-extrabold text-slate-700'>
												<td className='px-3 w-1/3'>Total</td>
												<td className='px-3 w-1/3'>
													{suppHours(created).total}
												</td>
											</tr>

											{/* Jours fériés et chômés */}
											<tr>
												<td className='px-3 w-1/3 font-bold' rowSpan={3}>
													Jours fériés/chômés
												</td>
												<td className='px-3 w-1/3 text-slate-500'>
													Nombre de jours
												</td>
												<td className='px-3 w-1/3'>
													{joursFeries(created).days}
												</td>
											</tr>
											<tr>
												<td className='px-3 w-1/3 text-slate-500'>Taux</td>
												<td className='px-3 w-1/3'>
													{joursFeries(created).rate}
												</td>
											</tr>
											<tr className='bg-secondary-50 font-extrabold text-slate-700'>
												<td className='px-3 w-1/3'>Total</td>
												<td className='px-3 w-1/3'>
													{joursFeries(created).total}
												</td>
											</tr>

											{/* Jours de congé */}
											<tr>
												<td className='px-3 w-1/3 font-bold' rowSpan={3}>
													Travail jours congé
												</td>
												<td className='px-3 w-1/3 text-slate-500'>
													Nombre de jours
												</td>
												<td className='px-3 w-1/3'>
													{joursConge(created).days}
												</td>
											</tr>
											<tr>
												<td className='px-3 w-1/3 text-slate-500'>Taux</td>
												<td className='px-3 w-1/3'>
													{joursConge(created).rate}
												</td>
											</tr>
											<tr className='bg-secondary-50 font-extrabold text-slate-700'>
												<td className='px-3 w-1/3'>Total</td>
												<td className='px-3 w-1/3'>
													{joursConge(created).total}
												</td>
											</tr>

											{/* Primes */}
											<tr>
												<td className='px-3 w-1/3 font-bold' rowSpan={6}>
													Primes
												</td>
												<td className='px-3 w-1/3 text-slate-500'>
													Primes de risque
												</td>
												<td className='px-3 w-1/3'>{primes(created).risque}</td>
											</tr>
											<tr>
												<td className='px-3 w-1/3 text-slate-500'>
													Primes d&apos;ancienneté
												</td>
												<td className='px-3 w-1/3'>
													{primes(created).anciennete}
												</td>
											</tr>
											<tr>
												<td className='px-3 w-1/3 text-slate-500'>
													Primes de pénibilité
												</td>
												<td className='px-3 w-1/3'>
													{primes(created).penibility}
												</td>
											</tr>
											<tr>
												<td className='px-3 w-1/3 text-slate-500'>Naissance</td>
												<td className='px-3 w-1/3'>{primes(created).birth}</td>
											</tr>
											<tr>
												<td className='px-3 w-1/3 text-slate-500'>
													Gratifications
												</td>
												<td className='px-3 w-1/3'>
													{primes(created).gratication}
												</td>
											</tr>
											<tr>
												<td className='px-3 w-1/3 text-slate-500'>Divers</td>
												<td className='px-3 w-1/3'>{primes(created).other}</td>
											</tr>
											<tr className='bg-secondary-50 font-extrabold text-slate-700'>
												<td className='px-3 w-1/3 text-center' colSpan={2}>
													Total Primes
												</td>
												<td className='px-3 w-1/3'>{primes(created).total}</td>
											</tr>

											{/* Jours maladies et accidents et salaire brut à payer */}
											<tr>
												<td className='px-3 w-1/3 font-bold' rowSpan={3}>
													Jours de maladies/accidents
												</td>
												<td className='px-3 w-1/3 text-slate-500'>
													Jours payés au 2/3
												</td>
												<td className='px-3 w-1/3'>
													{joursMaladAcc(created).days}
												</td>
											</tr>
											<tr>
												<td className='px-3 w-1/3 text-slate-500'>
													Taux journalier
												</td>
												<td className='px-3 w-1/3'>
													{joursMaladAcc(created).rate}
												</td>
											</tr>
											<tr className='bg-secondary-50 font-extrabold text-slate-700'>
												<td className='px-3 w-1/3'>Total</td>
												<td className='px-3 w-1/3'>
													{joursMaladAcc(created).total}
												</td>
											</tr>
											<tr className='bg-secondary-50 text-green-600'>
												<td className='w-1/3  text-center text-lg' colSpan={2}>
													Total brut dû
												</td>
												<td className='px-3 w-1/3 text-lg text-center font-black'>
													{totBrut} $
												</td>
											</tr>

											{/* Retenus et déductions */}
											<tr>
												<td className='border px-3 w-1/3 font-bold' rowSpan={6}>
													Retenus et déductions
												</td>
												<td className='border px-3 w-1/3 text-slate-500'>
													Pensions
												</td>
												<td className='border px-3 w-1/3'>
													{deductionData(created).pensions}
												</td>
											</tr>
											<tr>
												<td className='border px-3 w-1/3 text-slate-500'>
													Indemnités
												</td>
												<td className='border px-3 w-1/3'>
													{deductionData(created).indemnites}
												</td>
											</tr>
											<tr>
												<td className='border px-3 w-1/3 text-slate-500'>
													Avances sur salaire
												</td>
												<td className='border px-3 w-1/3'>
													{deductionData(created).avances}
												</td>
											</tr>
											<tr>
												<td className='border px-3 w-1/3 text-slate-500'>
													Retenues fiscales
												</td>
												<td className='border px-3 w-1/3'>
													{deductionData(created).retenusFisc}
												</td>
											</tr>
											<tr>
												<td className='border px-3 w-1/3 text-slate-500'>
													Cas sociaux
												</td>
												<td className='border px-3 w-1/3'>
													{deductionData(created).casSoc}
												</td>
											</tr>
											<tr>
												<td className='border px-3 w-1/3 text-slate-500'>
													Divers
												</td>
												<td className='border px-3 w-1/3'>
													{deductionData(created).other}
												</td>
											</tr>
											<tr className='bg-secondary-50 font-extrabold text-slate-700'>
												<td
													className='border px-3 w-1/3 font-bold text-center'
													colSpan={2}
												>
													Total Déductions
												</td>
												<td className='border px-3 w-1/3'>
													{deductionData(created).total}
												</td>
											</tr>

											{/* Allocations familiales et net à  payer */}
											<tr>
												<td className='px-3 w-1/3' rowSpan={4}>
													Allocations familiales
												</td>
												<td className=' px-3 w-1/3 text-slate-500'>
													Enfants bénéficiaires
												</td>
												<td className=' px-3 w-1/3'>
													{alloc(created).children}
												</td>
											</tr>
											<tr>
												<td className=' px-3 w-1/3 text-slate-500'>
													Nombre de jours
												</td>
												<td className=' px-3 w-1/3'>{alloc(created).days}</td>
											</tr>
											<tr>
												<td className=' px-3 w-1/3 text-slate-500'>Taux</td>
												<td className=' px-3 w-1/3'>{alloc(created).rate}</td>
											</tr>
											<tr className='bg-secondary-50 font-extrabold text-slate-700'>
												<td className='px-3 w-1/3'>Total</td>
												<td className='px-3 w-1/3'>{alloc(created).total}</td>
											</tr>
											<tr className='bg-secondary-50 text-green-600'>
												<td className='w-1/3  text-center text-lg' colSpan={2}>
													Net à payer
												</td>
												<td className='px-3 w-1/3 text-lg text-center font-black'>
													{totBrut +
														alloc(created).total -
														deductionData(created).total}{' '}
													$
												</td>
											</tr>
										</tbody>
									</table>
								)}
							</div>
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
