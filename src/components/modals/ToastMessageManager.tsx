'use client';
import { message as Toast } from 'antd';

const ToastMessageManager = () => {
	const [toast, contextHolder] = Toast.useMessage({ maxCount: 2 });
	return (
		<>
			{contextHolder}
			<div></div>
		</>
	);
};

export default ToastMessageManager;
