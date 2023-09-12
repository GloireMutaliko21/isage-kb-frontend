import React from 'react';
import CardStat from './CardStat';
import { BsCartX } from 'react-icons/bs';
import { PiArticleLight } from 'react-icons/pi';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

const CardsStatsInventaire = ({
	articles,
	unStocked,
	todaySheet,
	immobs,
	amortis,
}: {
	articles: Article[];
	unStocked: Article[];
	todaySheet: SheetGlobalHistoric[];
	immobs: Immob[];
	amortis: Immob[];
}) => {
	return (
		<section className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-5'>
			<CardStat
				title='articles'
				value={articles.length.toString()}
				decoration={<p>{immobs?.length} immobilisation(s)</p>}
				icon={<PiArticleLight />}
			/>
			<CardStat
				title='articles non en stock'
				value={unStocked.length.toString()}
				decoration={<p>{amortis?.length} immobs amortis</p>}
				icon={<BsCartX />}
			/>
			<CardStat
				title='Entrées journalières'
				value={todaySheet
					.filter((rec) => rec.typeOp == 'entry')
					.length.toString()}
				decoration={<p className='-ml-1'>entrée(s)</p>}
				icon={<FaArrowTrendUp />}
			/>
			<CardStat
				title='Sorties journalières'
				value={
					todaySheet.filter((rec) => rec.typeOp == 'out').length.toString() ||
					'0'
				}
				decoration={<p className='-ml-1'>sortie(s)</p>}
				icon={<FaArrowTrendDown />}
			/>
		</section>
	);
};

export default CardsStatsInventaire;
