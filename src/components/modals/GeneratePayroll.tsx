'use client';
import { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Modal, Select } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getPayList } from '@/redux/remuneration/remuneration.slice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { generatePayroll } from '@/docs/payroll';

const GeneratePayroll = ({ handlers }: { handlers: ModalsHandlers }) => {
	const [monthParameters, setMonthParameters] = useState<{
		month: number;
		year: number;
	}>({
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	});
	const dispatch = useAppDispatch();
	const { slipList } = useAppSelector((state) => state.remuneration);
	const { liste } = slipList;
	const onChangeDateChange = (date: any) => {
		setMonthParameters({ month: date.$M + 1, year: date.$y });
	};

	useEffect(() => {
		if (liste) {
			generatePayroll(
				'#table-payroll',
				`${monthParameters.month}-${monthParameters.year}`
			);
		}
	}, [liste, dispatch]);

	const onSubmit = (values: any) => {
		dispatch(
			getPayList({ month: monthParameters.month, year: monthParameters.year })
		);
	};

	const sTotaux = {
		salaires: liste?.map((item) => item.salary)?.reduce((a, c) => a + c, 0),
		heureSupp: liste?.map((item) => item.suppHours)?.reduce((a, c) => a + c, 0),
		ferie: liste?.map((item) => item.ferie)?.reduce((a, c) => a + c, 0),
		conge: liste?.map((item) => item.conge)?.reduce((a, c) => a + c, 0),
		prime: liste?.map((item) => item.primes)?.reduce((a, c) => a + c, 0),
		maladie: liste?.map((item) => item.maladie)?.reduce((a, c) => a + c, 0),
		deduction: liste?.map((item) => item.deduction)?.reduce((a, c) => a + c, 0),
		allocation: liste?.map((item) => item.alloc)?.reduce((a, c) => a + c, 0),
	};

	return (
		<Modal
			open={true}
			centered
			title='Générer la liste paie'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form layout='vertical' onFinish={onSubmit}>
				<Form.Item
					name='monthParams'
					label='Sélectionner le mois'
					rules={[{ required: true }]}
				>
					<DatePicker
						onChange={onChangeDateChange}
						picker='month'
						placeholder='Sélection mois'
						format={'MM-YYYY'}
					/>
				</Form.Item>
				<Form.Item>
					<div className='flex justify-end w-full gap-4'>
						<Button size='middle' onClick={() => handlers.close!('PAYROLL')}>
							Annuler
						</Button>
						<Button htmlType='submit'>Générer</Button>
					</div>
				</Form.Item>
			</Form>
			<div className='hidden'>
				<table id='table-payroll' className='min-w-full leading-normal border'>
					<thead>
						<tr className='text-sm text-secondary-900'>
							<th className='border py-2 bg-slate-100'>Agent</th>
							<th className='border py-2 bg-slate-100'>Grade</th>
							<th className='border py-2 bg-slate-100'>Salaire</th>
							<th className='border py-2 bg-slate-100'>H. Supp</th>
							<th className='border py-2 bg-slate-100'>Fériés</th>
							<th className='border py-2 bg-slate-100'>Congés</th>
							<th className='border py-2 bg-slate-100'>Primes</th>
							<th className='border py-2 bg-slate-100'>Mal/Acc</th>
							<th className='border py-2 bg-slate-100'>Retenus</th>
							<th className='border py-2 bg-slate-100'>Allocations</th>
							<th className='border py-2 bg-slate-100 text-sky-600 font-bold'>
								Total
							</th>
						</tr>
					</thead>
					<tbody>
						{liste.map(
							(
								{
									names,
									grade,
									salary,
									suppHours,
									ferie,
									conge,
									primes,
									maladie,
									deduction,
									alloc,
								},
								idx
							) => (
								<tr key={idx} className='text-slate-700'>
									<td className='border px-2 text-left text-slate-500'>
										{names}
									</td>
									<td className='border px-2 text-left text-slate-800'>
										{grade}
									</td>
									<td className='border px-2 text-right'>{salary}</td>
									<td className='border px-2 text-right'>{suppHours}</td>
									<td className='border px-2 text-right'>{ferie}</td>
									<td className='border px-2 text-right'>{conge}</td>
									<td className='border px-2 text-right'>{primes}</td>
									<td className='border px-2 text-right'>{maladie}</td>
									<td className='border px-2 text-right'>{deduction}</td>
									<td className='border px-2 text-right'>{alloc}</td>
									<td className='border px-2 text-center text-sky-600 font-bold bg-slate-100'>
										{salary +
											suppHours +
											ferie +
											conge +
											primes +
											maladie -
											deduction +
											alloc}
									</td>
								</tr>
							)
						)}
						<tr>
							<td
								colSpan={2}
								className='border px-2 text-right text-sky-600 font-bold text-xl bg-slate-100'
							>
								Total
							</td>
							<td className='border px-2 text-right text-sky-600 font-bold bg-slate-100'>
								{sTotaux.salaires}
							</td>
							<td className='border px-2 text-right text-sky-600 font-bold bg-slate-100'>
								{sTotaux.heureSupp}
							</td>
							<td className='border px-2 text-right text-sky-600 font-bold bg-slate-100'>
								{sTotaux.ferie}
							</td>
							<td className='border px-2 text-right text-sky-600 font-bold bg-slate-100'>
								{sTotaux.conge}
							</td>
							<td className='border px-2 text-right text-sky-600 font-bold bg-slate-100'>
								{sTotaux.prime}
							</td>
							<td className='border px-2 text-right text-sky-600 font-bold bg-slate-100'>
								{sTotaux.maladie}
							</td>
							<td className='border px-2 text-right text-sky-600 font-bold bg-slate-100'>
								{sTotaux.deduction}
							</td>
							<td className='border px-2 text-right text-sky-600 font-bold bg-slate-100'>
								{sTotaux.allocation}
							</td>
							<td className='border px-2 text-center text-primary-900 font-bold text-lg bg-primary-50'>
								{Object.values(sTotaux).reduce((a, r) => a + r, 0) -
									sTotaux.deduction * 2}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Modal>
	);
};

export default GeneratePayroll;
