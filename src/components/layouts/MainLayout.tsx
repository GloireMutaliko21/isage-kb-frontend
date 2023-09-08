import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({
	children,
}: {
	children:
		| React.ReactNode
		| React.ReactElement
		| React.ReactNode[]
		| React.ReactElement[];
}) => {
	return (
		<main>
			<div className='flex h-screen bg-[#f3f4f6]'>
				<Sidebar />
				<div className=' basis-full overflow-x-hidden h-screen  flex flex-col'>
					<Navbar />
					<div className='p-1 lg:p-10 overflow-y-auto max-w-screen'>
						{children}
					</div>
				</div>
			</div>
		</main>
	);
};

export default MainLayout;
