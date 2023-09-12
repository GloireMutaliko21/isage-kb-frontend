'use client';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { BiHome } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { BsCassette } from 'react-icons/bs';
import { TbSettingsCog } from 'react-icons/tb';
import {
	PiCalendarLight,
	PiCalendarPlusDuotone,
	PiUsersFourThin,
} from 'react-icons/pi';
import { AiOutlineBarChart } from 'react-icons/ai';
import { HiOutlineArrowsPointingIn } from 'react-icons/hi2';
import Link from 'next/link';
import useAuth from '@/hooks/useAuh';
import { checkUserRole } from '@/features/check-role';
import {
	ADMIN_LINKS,
	IMMOB_LINKS,
	INVENTORY_LINKS,
	PERSONNEL_LINKS,
} from '@/constants/links';
import { useSelectedLayoutSegment } from 'next/navigation';

const Sidebar = () => {
	const activeLink = useSelectedLayoutSegment();
	const { user, logout } = useAuth();

	const RenderItem = ({
		headerText,
		links,
		icon,
	}: {
		headerText: string;
		links: any[];
		icon: React.ReactNode;
	}) => {
		return {
			label: (
				<div className='flex gap-2 items-center justify-between text-[#737a87]'>
					<div className='flex gap-2 items-center text-[#737a87]'>
						<div className='text-xl'>{icon}</div>
						<span className='text-sm'>{headerText}</span>
					</div>
					<div>
						<IoIosArrowDown className='text-lg' />
					</div>
				</div>
			),
			children: (
				<ul className='ml-5 text-gray-500'>
					{links.map((link: HrefLink, i) => (
						<li key={i} className='my-4'>
							<Link
								href={link.href}
								className={`hover:text-secondary-800 duration-150 flex gap-2 items-center ${
									activeLink ===
										link.href.substring(
											link.href.lastIndexOf('/'),
											link.href.length
										) && 'text-secondary-800'
								}`}
							>
								<HiOutlineArrowsPointingIn className='text-secondary-600 text-lg' />
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			),
			showArrow: false,
		};
	};
	const items: CollapseProps['items'] = [];

	checkUserRole(
		user?.session?.user ??
			JSON.parse(localStorage.getItem('session-user')!)?.user,
		'gestion du personnel' || 'admin'
	) &&
		items.push(
			RenderItem({
				headerText: 'Gestion du personnel',
				links: PERSONNEL_LINKS,
				icon: <BiHome />,
			})
		);

	checkUserRole(
		user?.session?.user ??
			JSON.parse(localStorage.getItem('session-user')!)?.user,
		'gestion patrimoine' || 'admin'
	) &&
		items.push(
			RenderItem({
				headerText: 'Inventaire',
				links: INVENTORY_LINKS,
				icon: <AiOutlineBarChart />,
			})
		);

	checkUserRole(
		user?.session?.user ??
			JSON.parse(localStorage.getItem('session-user')!)?.user,
		'gestion patrimoine' || 'admin'
	) &&
		items.push(
			RenderItem({
				headerText: 'Immobilisations',
				links: IMMOB_LINKS,
				icon: <BsCassette />,
			})
		);

	checkUserRole(
		user?.session?.user ??
			JSON.parse(localStorage.getItem('session-user')!)?.user,
		'admin'
	) &&
		items.push(
			RenderItem({
				headerText: 'Configurations',
				links: ADMIN_LINKS,
				icon: <TbSettingsCog />,
			})
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
			<div className='absolute bottom-0 py-4 px-2 w-full'>
				<button
					onClick={logout}
					className='bg-secondary-600 p-3 py-2 text-sm w-full text-white rounded-md flex gap-2 justify-center items-center'
				>
					<RiLogoutCircleLine className='text-lg' />
					Déconnexion
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
