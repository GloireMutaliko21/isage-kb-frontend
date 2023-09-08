'use client';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { BiHome } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import {
	PiCalendarLight,
	PiCalendarPlusDuotone,
	PiUsersFourThin,
} from 'react-icons/pi';
import { RxDashboard } from 'react-icons/rx';
import { BsCalendarMonth } from 'react-icons/bs';
import Link from 'next/link';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
	{
		key: '1',
		label: (
			<div className='flex gap-2 items-center justify-between text-[#737a87]'>
				<div className='flex gap-2 items-center text-[#737a87]'>
					<BiHome className='text-xl' />
					<span className='text-sm'>Home</span>
				</div>
				<div>
					<IoIosArrowDown className='text-lg' />
				</div>
			</div>
		),
		children: <p>{text}</p>,
		showArrow: false,
		// style: { marginRight: -10, marginLeft: -5, marginBottom: 0 },
	},
	{
		key: '2',
		label: (
			<div className='flex gap-2 items-center justify-between text-[#737a87]'>
				<div className='flex gap-2 items-center text-[#737a87]'>
					<RxDashboard className='text-lg' />
					<span className='text-sm'>Components</span>
				</div>
				<div>
					<IoIosArrowDown className='text-lg' />
				</div>
			</div>
		),
		children: <p>{text}</p>,
		showArrow: false,
		// style: { marginRight: -10, marginLeft: -5 },
	},
];

const Sidebar = () => {
	return (
		<div className='h-screen z-10 w-80 bg-white overflow-y-auto relative py-2 border-r'>
			<Collapse
				ghost={true}
				accordion
				items={items}
				bordered={false}
				size='small'
			/>
			<div className='text-[#737a87] text-[14.3px] mx-3 my-3'>
				<Link href='soccase' className='flex gap-2 items-center'>
					<PiUsersFourThin className='text-xl' />
					Cas sociaux
				</Link>
			</div>
			<div className='text-[#737a87] text-[14.3px] mx-3 my-4'>
				<Link href='conge' className='flex gap-2 items-center'>
					<PiCalendarPlusDuotone className='text-xl' />
					Demande congé
				</Link>
			</div>
			<div className='text-[#737a87] text-[14.3px] mx-3 my-4'>
				<Link href='attend' className='flex gap-2 items-center'>
					<PiCalendarLight className='text-xl' />
					Mes présences
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
