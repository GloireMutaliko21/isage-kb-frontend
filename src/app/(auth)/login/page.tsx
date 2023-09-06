import LoginForm from '@/components/auth/LoginForm';
import MainProvider from '@/redux/Provider';

const page = () => {
	return (
		<main className='flex justify-center items-center h-full'>
			<MainProvider>
				<LoginForm />
			</MainProvider>
		</main>
	);
};

export default page;
