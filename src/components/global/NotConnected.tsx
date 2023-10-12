import useAuth from '@/hooks/useAuh';
import Image from 'next/image';

const NotConnected = () => {
	const { logout } = useAuth();
	return (
		<main className='w-full h-full flex flex-col justify-center items-center'>
			<div>
				<div className='w-96 h-96'>
					<Image
						src='/images/disconnected.png'
						alt='disconnected'
						width={500}
						height={500}
						className='w-full h-full'
					/>
				</div>
			</div>
			<div className='text-center'>
				<p className='py-3 text-lg'>Vous avez été déconnecté</p>
				<button
					onClick={logout}
					className='bg-secondary-600 p-3 py-2 text-sm w-full text-white rounded-md flex gap-2 justify-center items-center'
				>
					Veuillez vous reconnecter
				</button>
			</div>
		</main>
	);
};

export default NotConnected;
