import PageLoader from '@/components/global/PageLoader';
import dynamic from 'next/dynamic';

const MainLayout = dynamic(() => import('@/components/layouts/MainLayout'), {
	ssr: false,
	loading: () => <PageLoader />,
});

export const metadata = {
	title: 'ISAGE-KB - App',
	description: "Gestion Administrative de l'institution",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <MainLayout>{children}</MainLayout>;
}
