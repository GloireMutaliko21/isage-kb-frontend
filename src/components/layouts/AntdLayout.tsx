'use client';

import { ConfigProvider } from 'antd';

const AntdLayout = ({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#01579B',
					fontFamily: 'cairo',
				},
				components: {
					Table: {
						colorText: '#64748b',
					},
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
};

export default AntdLayout;
