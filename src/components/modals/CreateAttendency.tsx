'use client';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { QrReader } from 'react-qr-reader';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { createAttendency } from '@/redux/attendency/attendency.slice';

const CreateAttendency = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();
	const onSubmit = (res: any, err: any) => {
		if (!!res) {
			dispatch(createAttendency({ agentId: res?.text, dateNow: new Date() }));
			setScan(false);
		}
	};
	const [scan, setScan] = useState<boolean>(false);
	return (
		<>
			<Modal
				open={true}
				centered
				title='Scanner présence'
				footer={null}
				onCancel={() => handlers.close!(handlers.id!)}
			>
				<div className='flex justify-center items-center'>
					{scan ? (
						<div className='w-56 h-56'>
							<QrReader
								constraints={{ facingMode: 'user' }}
								onResult={onSubmit}
								className='w-full h-full'
							/>
						</div>
					) : (
						<button
							className='bg-secondary-600 hover:bg-secondary-500 hover:shadow-lg duration-300 p-3 py-2 text-sm text-white rounded-md flex gap-2 justify-center items-center'
							onClick={() => setScan(true)}
						>
							Ouvrir le scanner
						</button>
					)}
				</div>
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
