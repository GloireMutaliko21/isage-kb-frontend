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
import { HiOutlineArrowsPointingIn } from 'react-icons/hi2';
import Link from 'next/link';
import useAuth from '@/hooks/useAuh';
import { checkUserRole } from '@/features/check-role';
import { PERSONNEL_LINKS } from '@/constants/links';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Sidebar = () => {
	const { user } = useAuth();

	const RenderItem = ({
		headerText,
		links,
	}: {
		headerText: string;
		links: any[];
	}) => {
		return {
			label: (
				<div className='flex gap-2 items-center justify-between text-[#737a87]'>
					<div className='flex gap-2 items-center text-[#737a87]'>
						<BiHome className='text-xl' />
						<span className='text-sm'>{headerText}</span>
					</div>
					<div>
						<IoIosArrowDown className='text-lg' />
					</div>
				</div>
			),
			children: (
				<ul className='ml-5 text-gray-500'>
					{links.map((link, i) => (
						<li key={i} className='my-4'>
							<Link
								href={link.href}
								className='hover:text-secondary-800 duration-150 flex gap-2 items-center'
							>
								<HiOutlineArrowsPointingIn className='text-secondary-600 text-lg' />
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			),
			showArrow: false,
			// style: { marginRight: -10, marginLeft: -5, marginBottom: 0 },
		};
	};
	const items: CollapseProps['items'] = [
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

	checkUserRole(
		user?.session?.user ??
			JSON.parse(localStorage.getItem('session-user')!)?.user,
		'gestion du personnel'
	) &&
		items.push(
			RenderItem({ headerText: 'Gestion du personnel', links: PERSONNEL_LINKS })
		);

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
				<Link
					href='soccase'
					className='flex gap-2 items-center hover:text-secondary-800 duration-150'
				>
					<PiUsersFourThin className='text-xl' />
					Cas sociaux
				</Link>
			</div>
			<div className='text-[#737a87] text-[14.3px] mx-3 my-4'>
				<Link
					href='conge'
					className='flex gap-2 items-center hover:text-secondary-800 duration-150'
				>
					<PiCalendarPlusDuotone className='text-xl' />
					Demande congé
				</Link>
			</div>
			<div className='text-[#737a87] text-[14.3px] mx-3 my-4'>
				<Link
					href='attend'
					className='flex gap-2 items-center hover:text-secondary-800 duration-150'
				>
					<PiCalendarLight className='text-xl' />
					Mes présences
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
