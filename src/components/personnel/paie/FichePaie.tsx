import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
	getFamAllocPerAgent,
	getPaySlipPerAgent,
	getPrimeAgent,
	getRemDaysCongePerAgent,
	getRemDaysFeriePerAgent,
	getRemMaladAccPerAgent,
	getSalDeducPerAgent,
	getSuppHourAgent,
} from '@/redux/remuneration/remuneration.slice';
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
							<div className='text-red-500'>Agent non payé ce mois</div>
						)}
						<div>
							{!fiche?.agent ? (
								<button className='bg-secondary-600 hover:bg-secondary-500 hover:shadow-lg duration-300 p-3 py-1 text-sm text-white rounded-md flex gap-2 justify-center items-center'>
									Payer ce mois
								</button>
							) : (
								<div className='text-red-500'>
									Agent déjà payé pour ce mois{' '}
									<span>Télécharger la fiche de paie</span>
								</div>
							)}
						</div>
					</div>
				</section>
			) : (
				<></>
			)}
		</>
	);
};

export default FichePaie;
