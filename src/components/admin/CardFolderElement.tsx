import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getFolderElementById } from '@/redux/folder-element/folder-element.slice';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import { Card, Skeleton } from 'antd';
import { FcFolder } from 'react-icons/fc';

const { Meta } = Card;
const CardFolderElement = ({
	folderElement,
	loading,
}: {
	folderElement: FolderElement;
	loading: boolean;
}) => {
	const dispatch = useAppDispatch();
	return (
		<Card
			actions={[
				<button
					key={`${folderElement.id}-${folderElement.title}`}
					onClick={() => {
						dispatch(getFolderElementById(folderElement.id));
						dispatch(openModal({ modal_ID: 'FOLDER_ELEMENT_UPDATE' }));
					}}
				>
					Modifier
				</button>,
				<button
					key={`${folderElement.id}-${folderElement.title}`}
					onClick={() => {
						dispatch(getFolderElementById(folderElement.id));
						dispatch(openModal({ modal_ID: 'FOLDER_ELEMENT_DETAILS' }));
					}}
				>
					Détails
				</button>,
			]}
			className='shadow cursor-pointer duration-300 scale-95 hover:scale-100'
		>
			<Skeleton loading={loading} avatar active>
				<Meta
					avatar={<FcFolder className='text-2xl' />}
					title={
						<p className='capitalize text-slate-600'>{folderElement.title}</p>
					}
					description={
						<p className='font-semibold'>
							Agents ayant cet élément : {folderElement.agents?.length}
						</p>
					}
				/>
			</Skeleton>
		</Card>
	);
};

export default CardFolderElement;
