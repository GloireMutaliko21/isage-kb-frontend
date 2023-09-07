import MainLayout from '../../components/layouts/MainLayout';
export const metadata = {
	title: 'ISAGE-KB - App',
	description: "Gestion Administrative de l'institution",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <MainLayout children={children} />;
}
