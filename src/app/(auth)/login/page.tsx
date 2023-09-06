import LoginForm from '@/components/auth/LoginForm';
import MainProvider from '@/redux/Provider';

const page = () => {
	return (
		<main className='flex justify-center items-center h-screen'>
			<div className='lg:bg-slate-100 px-4 md:px-10 2xl:px-24 py-0 md:py-2 2xl:py-14 w-full'>
				<div className='bg-white grid md:grid-cols-2 lg:shadow-xl w-full max-w-[100%]'>
					<MainProvider>
						<LoginForm />
					</MainProvider>

					<div className='hidden lg:block bg-[url("/images/login-bg.png")] bg-cover bg-center bg-no-repeat'></div>
				</div>
			</div>
		</main>
	);
};

export default page;
