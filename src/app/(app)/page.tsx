'use client';
import useAgents from '@/hooks/useAgents';
import useAuth from '@/hooks/useAuh';
import MainProvider from '@/redux/Provider';
import Link from 'next/link';

export default function Home() {
	const { agents } = useAgents();
	const { isLogin } = useAuth();
	if (!isLogin)
		return <div>Veillez vous connectez pour voir vos évenements</div>;
	return (
		<main className='w-full flex flex-col'>
			{agents.length}
			<ul>{agents.map((agent) => agent.names)}</ul>
		</main>
	);
}
