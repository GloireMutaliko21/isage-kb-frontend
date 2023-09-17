import AntdLayout from '@/components/layouts/AntdLayout';
import './globals.css';
import type { Metadata } from 'next';
import MainProvider from '@/redux/Provider';
import NextTopLoader from 'nextjs-toploader';
import ModalManager from '@/components/modals/ModalManager';
import ToastMessageManager from '@/components/modals/ToastMessageManager';
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
					<NextTopLoader
						color='#00838F'
						initialPosition={0.08}
						crawlSpeed={200}
						height={3}
						crawl={true}
						showSpinner={false}
						easing='ease'
						speed={200}
						shadow='0 0 10px #2299DD,0 0 5px #2299DD'
					/>
					<AntdLayout>
						{children}

						<ModalManager />
						<ToastMessageManager />
					</AntdLayout>
				</MainProvider>
			</body>
		</html>
	);
}
