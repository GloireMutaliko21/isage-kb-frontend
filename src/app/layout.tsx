import AntdLayout from '@/components/layouts/AntdLayout';
import './globals.css';
import type { Metadata } from 'next';
import MainProvider from '@/redux/Provider';
export const metadata: Metadata = {
	title: 'ISAGE-KB',
	description: "Gestion Administrative de l'institution",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='fr'>
			<body>
				<MainProvider>
					<AntdLayout>{children}</AntdLayout>
				</MainProvider>
			</body>
		</html>
	);
}
