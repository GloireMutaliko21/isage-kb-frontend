import React, { useEffect, useState } from 'react';
import { PiDownloadSimpleFill } from 'react-icons/pi';
import { DatePicker } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getGlobalHistoric } from '@/redux/inventaire/inventaire.slice';
import { generateStockSheet } from '@/docs/inventory';
import { frenchFormattedDate } from '@/utils/dates';

const { RangePicker } = DatePicker;

const Historic = () => {
	const [date, setDate] = useState<any>();

	const dispatch = useAppDispatch();
	const { globalSheet } = useAppSelector((state) => state.inventaire);

	useEffect(() => {
		dispatch(
			getGlobalHistoric({
				start: date?.[0]?.$d,
				end: date?.[1]?.$d,
			})
		);
	}, [date]);

	const entries = globalSheet.find((fiche) => fiche.typeOp == 'entry') ?? {
		typeOp: 'entry',
		data: [],
	};
	const outs = globalSheet.find((fiche) => fiche.typeOp == 'out') ?? {
		typeOp: 'out',
		data: [],
	};

	const maxLength = Math.max(entries?.data.length!, outs?.data.length!);

	const onGenerate = async () => {
		if (!globalSheet || !date) return;
		await generateStockSheet(
			'#entries',
			'#outs',
			`de ${frenchFormattedDate(date?.[0]?.$d).slice(
				6
			)} au ${frenchFormattedDate(date?.[1]?.$d).slice(6)}`
		);
	};

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
		<section>
			<div className='mb-5 flex justify-between'>
				<button
					onClick={onGenerate}
					className='flex gap-3 items-center rounded-md hover:shadow-lg duration-300 bg-secondary-700 px-4 py-2 text-white'
				>
					<PiDownloadSimpleFill className='text-xl' />
					<span>Exporter la liste</span>
				</button>
				<div className='flex gap-5'>
					<RangePicker
						format={'DD-MM-YYYY'}
						onChange={(values) => setDate(values)}
					/>
				</div>
			</div>
			<div className='flex justify-between bg-white p-4 mb-4'>
				{/* Colonne des Entrées */}
				<div className='w-1/2 pr-2'>
					<h2 className='text-lg font-semibold mb-2 text-center'>Entrées</h2>
					<table id='entries' className='w-full'>
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
									<td className='border p-2 font-black'>{entry.qte || ''}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Colonne des Sorties */}
				<div className='w-1/2 pl-2'>
					<h2 className='text-lg font-semibold mb-2 text-center'>Sorties</h2>
					<table id='outs' className='w-full'>
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
									<td className='border p-2 font-black'>{exit.qte || ''}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default Historic;
