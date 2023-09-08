'use client';
import React from 'react';
import { RiLoader2Line } from 'react-icons/ri';

const PageLoader = () => {
	return (
		<section className='bg-white relative place-items-center grid h-screen w-screen gap-4'>
			<div className='bg-gray-500 w-48 h-48  absolute animate-ping rounded-full delay-5s shadow-xl'></div>
			<div className='bg-gray-400 w-32 h-32 absolute animate-ping rounded-full shadow-xl'></div>

			<div className='bg-gray-900 w-24 h-24 absolute animate-pulse rounded-full shadow-xl'></div>
			<RiLoader2Line className='text-white filter mix-blend-overlay text-3xl animate-spin' />
		</section>
	);
};

export default PageLoader;
