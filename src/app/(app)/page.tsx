import PersPatr from '@/components/dashboards/PersPatr';

export default function Home() {
	return (
		<main className='w-full flex flex-col'>
			<div className='p-5 border-b'>
				<h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
			</div>
			<PersPatr />
		</main>
	);
}
