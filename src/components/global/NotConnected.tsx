import useAuth from '@/hooks/useAuh';
import Image from 'next/image';

const NotConnected = () => {
	const { logout } = useAuth();
	return (
		<main className='w-full h-full flex justify-center items-center'>
			<div>
				<div className='w-h-64 h-64'>
					<Image
						src='/images/disconnected.png'
						alt='disconnected'
						width={500}
						height={500}
					/>
				</div>
				<div className='text-center'>
					<p className='py-7 text-lg'>Vous avez été déconnecté</p>
					<button
						onClick={logout}
						className='bg-secondary-600 p-3 py-2 text-sm w-full text-white rounded-md flex gap-2 justify-center items-center'
					>
						Veuillez vous reconnecter
					</button>
				</div>
			</div>
		</main>
	);
};

export default NotConnected;
