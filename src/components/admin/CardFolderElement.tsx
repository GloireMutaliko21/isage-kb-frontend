import { Card, Skeleton } from 'antd';
import Link from 'next/link';
import { FcFolder } from 'react-icons/fc';

const { Meta } = Card;
const CardFolderElement = ({
	folderElement,
	loading,
}: {
	folderElement: FolderElement;
	loading: boolean;
}) => {
	return (
		<Card
			actions={[
				<button key={`${folderElement.id}-${folderElement.title}`}>
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
