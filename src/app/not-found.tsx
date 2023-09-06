import Link from 'next/link';

export default function NotFound() {
	return (
		<main className='w-full h-screen flex justify-center items-center flex-col bg-[url("/images/404.png")] bg-center bg-contain bg-no-repeat'>
			<Link
				href='/'
				className='bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-xl hover:shadow-md duration-300'
			>
				Retour à l&apos;accueil
			</Link>
		</main>
	);
}
