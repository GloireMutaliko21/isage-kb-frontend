import { remDetailsData } from '@/constants/localData';
import CardDetail from './CardDetail';

const PaieDetails = () => {
	return (
		<section className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-2'>
			{remDetailsData.map((detail) => (
				<CardDetail
					key={detail.modalKey}
					modalKey={detail.modalKey}
					title={detail.title}
				/>
			))}
		</section>
	);
};

export default PaieDetails;
