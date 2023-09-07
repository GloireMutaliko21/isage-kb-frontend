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
					<div className='bg-primary-800 md:w-full w-full flex justify-between items-center p-7 text-white'>
						<div className='hidden md:flex gap-x-4 [&>.active]:border-b-4 border-white text-sm'></div>
					</div>
					<div className='p-1 lg:p-10 overflow-y-auto max-w-screen'>
						{children}
					</div>
				</div>
			</div>
		</main>
	);
};

export default MainLayout;
