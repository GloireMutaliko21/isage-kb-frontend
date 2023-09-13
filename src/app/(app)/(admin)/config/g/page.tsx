import PageHeader from '@/components/global/PageHeader';
import React from 'react';

const grades = () => {
	return (
		<main className='flex flex-col h-full'>
			<PageHeader title='Gestion des grades' />
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>grades</div>
			</section>
		</main>
	);
};

export default grades;
