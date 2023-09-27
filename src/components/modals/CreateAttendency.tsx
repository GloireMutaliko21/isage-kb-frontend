'use client';
import { Button, Modal } from 'antd';
import { QrReader } from 'react-qr-reader';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { createAttendency } from '@/redux/attendency/attendency.slice';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';

const CreateAttendency = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();
	const onSubmit = (res: any, err: any) => {
		if (!!res) {
			dispatch(createAttendency({ agentId: res?.text, dateNow: new Date() }));
			// dispatch(closeModal());
		}
	};
	return (
		<>
			<Modal
				open={true}
				centered
				title='Scanner présence'
				footer={null}
				onCancel={() => handlers.close!(handlers.id!)}
			>
				<QrReader constraints={{ facingMode: 'user' }} onResult={onSubmit} />
				<div className='flex justify-end w-full gap-4'>
					<Button
						size='middle'
						onClick={() => handlers.close!('NEW_ATTENDENCY')}
					>
						Annuler
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default CreateAttendency;
