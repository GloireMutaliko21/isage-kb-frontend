export const metadata = {
	title: 'ISAGE-KB - Connexion',
	description: "Gestion Administrative de l'institution",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='h-screen'>
				<main className='px-2 md:px-10 lg:px-16 xl:px-20 2xl:px-72 w-full h-full'>
					{children}
				</main>
			</body>
		</html>
	);
}
