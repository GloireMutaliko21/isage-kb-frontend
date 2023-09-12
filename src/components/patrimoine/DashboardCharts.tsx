import {
	Column,
	type ColumnConfig,
	Pie,
	type PieConfig,
} from '@ant-design/plots';
import { Switch } from 'antd';
import Link from 'next/link';
import React from 'react';
import { HiArrowRight } from 'react-icons/hi2';

const DashboardCharts = ({
	onChangeLastYear,
	config,
	configImmob,
}: {
	onChangeLastYear: any;
	config: ColumnConfig;
	configImmob: PieConfig;
}) => {
	return (
		<div className='p-5'>
			<div className='grid lg:grid-cols-3 2xl:grid-cols-6 gap-9'>
				<div className='bg-white lg:col-span-2 2xl:col-span-4 rounded-lg'>
					<div className='border-b border-gray-300 text-slate-600'>
						<div className='p-5 flex justify-between items-center'>
							<h2 className='text-lg font-medium'>Synthèse Stock</h2>
							<div className='flex gap-2 items-center'>
								<h3 className='text-sm font-light'>L&apos;an dernier</h3>
								<Switch
									className='bg-secondary-100'
									onChange={onChangeLastYear}
								/>
							</div>
						</div>
					</div>
					<div className='p-5'>
						<Column {...config} height={250} />
					</div>
				</div>
				<div className='bg-white lg:col-span-1 2xl:col-span-2 rounded-lg'>
					<div className='border-b border-gray-300 text-slate-600'>
						<div className='p-5 flex justify-between items-center'>
							<h2 className='text-lg font-medium'>Immobilisations</h2>
							<div className='flex gap-2 items-center'>
								<div>
									<Link
										href='/immob'
										className='text-sm hover:text-secondary-500 font-light flex items-center gap-2'
									>
										Plus
										<HiArrowRight />
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className='p-5'>
						<Pie {...configImmob} height={250} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardCharts;
