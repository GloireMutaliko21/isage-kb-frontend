import { Card, Skeleton } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getServiceById } from '@/redux/service-section/section.slice';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import { BsCollection } from 'react-icons/bs';

const { Meta } = Card;
const CardService = ({
	service,
	loading,
}: {
	service: Section;
	loading: boolean;
}) => {
	const dispatch = useAppDispatch();
	return (
		<Card
			style={{ width: 300, marginTop: 16 }}
			actions={[
				<button
					key={`${service.id}-${service.libelle}`}
					onClick={() => {
						dispatch(getServiceById(service.id));
						dispatch(openModal({ modal_ID: 'SERIVICE_UPDATE' }));
					}}
				>
					Modifier
				</button>,
				<button
					key={`${service.id}-${service.createdAt}`}
					onClick={() => {
						dispatch(getServiceById(service.id));
						dispatch(openModal({ modal_ID: 'SERVICE_DETAILS' }));
					}}
				>
					Détails
				</button>,
			]}
			className='shadow cursor-pointer duration-300 scale-95 hover:scale-100'
		>
			<Skeleton loading={loading} avatar active>
				<Meta
					avatar={<BsCollection className='text-2xl' />}
					title={<p className='capitalize text-slate-600'>{service.libelle}</p>}
					description={
						<p className='font-semibold'>
							Immobilisations : {service.immobilisations?.length}
						</p>
					}
				/>
			</Skeleton>
		</Card>
	);
};

export default CardService;
