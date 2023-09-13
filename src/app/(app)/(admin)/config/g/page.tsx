'use client';
import CardGrade from '@/components/admin/CardGrade';
import PageHeader from '@/components/global/PageHeader';
import useGrades from '@/hooks/useGrades';
import React from 'react';

const Grades = () => {
	const { grades, status } = useGrades();

	return (
		<main className='flex flex-col h-full'>
			<PageHeader title='Gestion des grades' />
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<div
						className={`${
							grades.length > 2 && 'justify-center'
						} flex justify-start flex-wrap gap-2`}
					>
						{grades.map((grade) => (
							<CardGrade
								key={grade.id}
								grade={grade}
								loading={status.isLoading}
							/>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default Grades;
