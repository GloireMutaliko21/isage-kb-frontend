'use client';
import useAuth from '@/hooks/useAuh';
import { Popover } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
	const { user, logout } = useAuth();

	const PopoverContent = () => {
		return (
			<div className='text-[#737a87] w-40 flex flex-col'>
				<Link
					href='/profile'
					className='hover:text-gray-600 hover:bg-gray-200 w-full p-2 rounded-md'
				>
					Mon profile
				</Link>
				<div className='hover:text-gray-600 hover:bg-gray-200 w-full p-2 rounded-md'>
					<button onClick={logout}>Déconnexion</button>
				</div>
			</div>
		);
	};
	return (
		<div className='bg-white md:w-full w-full flex justify-between items-center px-4 py-2 border-b'>
			<div className='w-full flex justify-between items-center'>
				<h1 className='font-bold text-2xl text-secondary-700'>ISAGE-KB</h1>
				<div>
					<Popover
						trigger='click'
						placement='bottomRight'
						content={<PopoverContent />}
						arrow={false}
						className='cursor-pointer'
					>
						<div className='w-12 h-12 rounded-full border-2 border-secondary-700 p-px'>
							<Image
								src={'/images/404.png'}
								// src={user?.session?.user?.imgUrl}
								alt=''
								width={500}
								height={500}
								className='object-cover rounded-full'
							/>
						</div>
					</Popover>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
