'use client';

import CardService from '@/components/admin/CardService';
import PageHeader from '@/components/global/PageHeader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import useServiceSection from '@/hooks/useServiceSection';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';

const SectionService = () => {
	const { services, status } = useServiceSection();
	const dispatch = useAppDispatch();

	const CreateServiceBtn = () => {
		return (
			<div className=''>
				<button
					onClick={() => dispatch(openModal({ modal_ID: 'NEW_SERVICE' }))}
				>
					Nouveau service
				</button>
			</div>
		);
	};
	return (
		<main className='flex flex-col h-full'>
			<PageHeader title='Services' actionButton={<CreateServiceBtn />} />
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<div
						className={`${
							services.length > 2 && 'justify-center'
						} flex justify-start flex-wrap gap-2`}
					>
						{services.map((service) => (
							<CardService
								key={service.id}
								service={service}
								loading={status.isLoading}
							/>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default SectionService;
