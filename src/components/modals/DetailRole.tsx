import { Button, Modal, Popconfirm, Tag } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { frenchFormattedDate } from '@/utils/dates';
import { deleteRole } from '@/redux/roles/role.slice';

const DetailRole = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();
	const { selectedRole, status } = useAppSelector((state) => state.role);

	return (
		<Modal
			open={true}
			centered
			title={`Détails du rôle ${selectedRole?.title}`}
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<div className='m-5 flex items-center justify-between'>
				<div className=''>
					<p>Titre</p>
					<p>Créé le</p>
				</div>
				<div className='font-medium'>
					<Tag className='!text-sm' color='cyan'>
						{selectedRole?.title}
					</Tag>
					<p>{`${frenchFormattedDate(selectedRole?.createdAt)}`}</p>
				</div>
			</div>
			<div className='mt-5'>
				<Popconfirm
					title="Supprimer l'élément"
					description='Êtes-vous sûr de vouloir supprimer rôle ?'
					onConfirm={() => {
						dispatch(deleteRole(selectedRole?.id!));
						handlers.close!(handlers.id!);
					}}
					okText='Oui'
					cancelText='Non'
					okButtonProps={{
						className: '!bg-transparent !border !text-secondary-700',
						type: 'default',
					}}
				>
					<Button danger loading={status.isLoading}>
						Supprimer
					</Button>
				</Popconfirm>
			</div>
		</Modal>
	);
};

export default DetailRole;
