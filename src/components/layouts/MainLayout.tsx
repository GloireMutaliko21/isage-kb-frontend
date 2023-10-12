'use client';
import useAuth from '@/hooks/useAuh';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import NotConnected from '../global/NotConnected';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const { isLogin } = useAuth();

	return (
		<main>
			<div className='flex h-screen bg-[#f3f4f6]'>
				<Sidebar />
				<div className=' basis-full overflow-x-hidden h-screen  flex flex-col'>
					<Navbar />
					<div className='overflow-y-auto max-w-screen flex-grow'>
						{isLogin ? children : <NotConnected />}
					</div>
				</div>
			</div>
		</main>
	);
};

export default MainLayout;
