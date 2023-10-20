import PageHeader from '@/components/global/PageHeader';

const Page = () => {
	const CreateImmobButton = () => {
		return (
			<div className=''>
				<button
				// onClick={() => dispatch(openModal({ modal_ID: 'NEW_ARTICLE' }))}
				>
					Ajouter une immobilisation
				</button>
			</div>
		);
	};
	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title='Gestion des articles'
				actionButton={<CreateImmobButton />}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'></div>
			</section>
		</main>
	);
};

export default Page;
