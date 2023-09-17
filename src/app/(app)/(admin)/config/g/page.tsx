'use client';
import CardGrade from '@/components/admin/CardGrade';
import PageHeader from '@/components/global/PageHeader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import useGrades from '@/hooks/useGrades';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';

const Grades = () => {
	const { grades, status } = useGrades();
	const dispatch = useAppDispatch();

	const CreateGradeButton = () => {
		return (
			<div className=''>
				<button onClick={() => dispatch(openModal({ modal_ID: 'NEW_GRADE' }))}>
					Nouveau grade
				</button>
			</div>
		);
	};

	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title='Gestion des grades'
				actionButton={<CreateGradeButton />}
			/>
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
