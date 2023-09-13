'use client';
import { Button, Modal } from 'antd';

const CreateGrade = ({ handlers }: { handlers: ModalsHandlers }) => {
	return (
		<Modal
			open={true}
			destroyOnClose
			mousePosition={{
				y: window.innerHeight / 2,
				x: window.innerWidth / 2,
			}}
			title='Nouveau Grade'
			footer={
				<div className='flex justify-end gap-4'>
					<Button size='middle' onClick={() => handlers.close!('NEW_GRADE')}>
						Annuler
					</Button>
					<Button size='middle' onClick={() => {}}>
						Enregistrer
					</Button>
				</div>
			}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			create grade
		</Modal>
	);
};

export default CreateGrade;
