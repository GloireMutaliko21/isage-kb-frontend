import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { deleteFolderElement } from '@/redux/folder-element/folder-element.slice';
import { frenchFormattedDate } from '@/utils/dates';
import { Button, Modal, Popconfirm, Tag } from 'antd';

const DetailFolderElement = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();
	const { selectedFoldEl, status } = useAppSelector(
		(state) => state.folderElement
	);

	return (
		<Modal
			open={true}
			centered
			title={`Détails de l'élément ${selectedFoldEl?.title}`}
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<div className='m-5 flex items-center justify-between'>
				<div className=''>
					<p>Titre</p>
					<p>Agent ayant cet élément</p>
					<p>Créé le</p>
				</div>
				<div className='font-medium'>
					<Tag className='!text-sm' color='cyan'>
						{selectedFoldEl?.title}
					</Tag>
					<p>{selectedFoldEl?.agents?.length}</p>
					<p>{`${frenchFormattedDate(selectedFoldEl?.createdAt)}`}</p>
				</div>
			</div>
			<div className='mt-5'>
				<Popconfirm
					title="Supprimer l'élément"
					description='Êtes-vous sûr de vouloir supprimer cet élément ?'
					onConfirm={() => {
						dispatch(deleteFolderElement(selectedFoldEl?.id!));
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

export default DetailFolderElement;
