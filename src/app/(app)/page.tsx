import Sidebar from '@/components/layouts/Sidebar';
import Link from 'next/link';

export default function Home() {
	return (
		<main className='w-full flex flex-col'>
			<Link href='/login'>Login</Link>
			<Link href='/' className='text-2xl font-bold'>
				Dashboard
			</Link>
		</main>
	);
}
