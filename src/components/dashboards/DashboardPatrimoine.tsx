import Link from 'next/link';
import React from 'react';
import CardsStatsInventaire from './PersPatr/CardsStatsInventaire';
import useArticles from '@/hooks/useArticles';
import useInventaire from '@/hooks/useInventaire';
import useImmob from '@/hooks/useImmob';

const DashboardPatrimoine = () => {
	const { articles, unStocked } = useArticles();
	const { stockSheet } = useInventaire();
	const { amortis, immobs } = useImmob();

	return (
		<section>
			{/* Header */}
			<div className='border-b flex justify-between items-center p-5'>
				<h1 className='text-2xl font-semibold'>Dashboard</h1>
				<div>
					<Link
						href='/stocks/inv'
						className='bg-secondary-600 hover:bg-secondary-500 hover:shadow-lg duration-300 p-3 py-2 text-sm w-full text-white rounded-md flex gap-2 justify-center items-center'
					>
						Etats des stocks
					</Link>
				</div>
			</div>

			{/* Cards */}
			<CardsStatsInventaire
				articles={articles}
				unStocked={unStocked}
				todaySheet={stockSheet}
				amortis={amortis}
				immobs={immobs}
			/>
		</section>
	);
};

export default DashboardPatrimoine;
