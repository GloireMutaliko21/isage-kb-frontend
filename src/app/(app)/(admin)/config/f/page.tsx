'use client';

import CardFolderElement from '@/components/admin/CardFolderElement';
import PageHeader from '@/components/global/PageHeader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import useFolderElement from '@/hooks/useFolderElement';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';

const FolderElement = () => {
	const { folderElements, status } = useFolderElement();
	const dispatch = useAppDispatch();

	const CreateFolderElementBtn = () => {
		return (
			<div className=''>
				<button
					onClick={() =>
						dispatch(openModal({ modal_ID: 'NEW_FOLDER_ELEMENT' }))
					}
				>
					Nouvel élément de dossier
				</button>
			</div>
		);
	};
	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title='Eléments de dossier'
				actionButton={<CreateFolderElementBtn />}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<div
						className={`${
							folderElements.length > 2 && 'justify-center'
						} flex justify-start flex-wrap gap-2`}
					>
						{folderElements.map((folderElement) => (
							<CardFolderElement
								key={folderElement.id}
								folderElement={folderElement}
								loading={status.isLoading}
							/>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default FolderElement;
