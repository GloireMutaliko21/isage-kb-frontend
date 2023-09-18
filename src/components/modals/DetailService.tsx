import { Modal, Tag } from 'antd';
import { useAppSelector } from '@/hooks/useAppSelector';
import { frenchFormattedDate } from '@/utils/dates';

const DetailService = ({ handlers }: { handlers: ModalsHandlers }) => {
	const { selectedService } = useAppSelector((state) => state.service);

	return (
		<Modal
			open={true}
			centered
			title={`Détails du service ${selectedService?.libelle}`}
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<div className='m-5 flex items-center justify-between'>
				<div className=''>
					<p>Libellé</p>
					<p>Immobilisations</p>
					<p>Créé le</p>
				</div>
				<div className='font-medium'>
					<Tag className='!text-sm' color='cyan'>
						{selectedService?.libelle}
					</Tag>
					<p>{selectedService?.immobilisations?.length}</p>
					<p>{`${frenchFormattedDate(selectedService?.createdAt)}`}</p>
				</div>
			</div>
		</Modal>
	);
};

export default DetailService;
