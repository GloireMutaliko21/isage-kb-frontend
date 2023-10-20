import useInventaire from '@/hooks/useInventaire';
import React from 'react';
import { frenchFormattedDate } from '../../../utils/dates';

const Today = () => {
	const { todayStockSheet } = useInventaire();
	const entries = todayStockSheet.find((fiche) => fiche.typeOp == 'entry');
	const outs = todayStockSheet.find((fiche) => fiche.typeOp == 'out');

	const maxLength = Math.max(entries?.data.length!, outs?.data.length!);

	const paddedEntries = Array.from(
		{ length: maxLength },
		(_, index) =>
			entries?.data[index] || {
				date: '',
				designation: '',
				libelle: '',
				qte: '',
			}
	);
	const paddedOuts = Array.from(
		{ length: maxLength },
		(_, index) =>
			outs?.data[index] || { date: '', designation: '', libelle: '', qte: '' }
	);

	return (
		<div className='flex justify-between bg-white p-4 mb-4'>
			{/* Colonne des Entrées */}
			<div className='w-1/2 pr-2'>
				<h2 className='text-lg font-semibold mb-2 text-center'>Entrées</h2>
				<table className='w-full'>
					<thead>
						<tr>
							<th className='border p-2'>N°</th>
							<th className='border p-2'>Date</th>
							<th className='border p-2'>Article</th>
							<th className='border p-2'>Libellé</th>
							<th className='border p-2'>Qty</th>
						</tr>
					</thead>
					<tbody>
						{paddedEntries.map((entry, index) => (
							<tr key={index}>
								<td className='border p-2'>{index + 1}</td>
								<td className='border p-2'>{`${
									entry.date?.toString().slice(0, 10) || ''
								}`}</td>
								<td className='border p-2'>{entry.designation || ''}</td>
								<td className='border p-2'>{entry.libelle || ''}</td>
								<td className='border p-2'>{entry.qte || ''}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Colonne des Sorties */}
			<div className='w-1/2 pl-2'>
				<h2 className='text-lg font-semibold mb-2 text-center'>Sorties</h2>
				<table className='w-full'>
					<thead>
						<tr>
							<th className='border p-2'>N°</th>
							<th className='border p-2'>Date</th>
							<th className='border p-2'>Article</th>
							<th className='border p-2'>Libellé</th>
							<th className='border p-2'>Qty</th>
						</tr>
					</thead>
					<tbody>
						{paddedOuts.map((exit, index) => (
							<tr key={index}>
								<td className='border p-2'>{index + 1}</td>
								<td className='border p-2'>{`${
									exit.date?.toString().slice(0, 10) || ''
								}`}</td>
								<td className='border p-2'>{exit.designation || ''}</td>
								<td className='border p-2'>{exit.libelle || ''}</td>
								<td className='border p-2'>{exit.qte || ''}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Today;
