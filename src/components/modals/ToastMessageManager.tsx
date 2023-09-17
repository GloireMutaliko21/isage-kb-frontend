'use client';
import { useAppSelector } from '@/hooks/useAppSelector';
import { message as Toast } from 'antd';

const ToastMessageManager = () => {
	const [toast, contextHolder] = Toast.useMessage({ maxCount: 2 });

	/**
	 * Agent files toat manager
	 */
	const { status: agentFileStatus, message: agentFileMessage } = useAppSelector(
		(state) => state.agentFiles
	);

	return (
		<>
			{contextHolder}
			<div></div>
		</>
	);
};

export default ToastMessageManager;
