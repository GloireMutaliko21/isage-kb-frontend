'use client';
import DashboardPatrimoine from '@/components/dashboards/DashboardPatrimoine';
import DashboardPersonnel from '@/components/dashboards/DashboardPersonnel';
import PersPatr from '@/components/dashboards/PersPatr';
import NotConnected from '@/components/global/NotConnected';
import { checkUserRole } from '@/features/check-role';
import useAuth from '@/hooks/useAuh';

export default function Home() {
	const { isLogin, user } = useAuth();
	if (!isLogin) return <NotConnected />;
	return (
		<main className='w-full flex flex-col'>
			{checkUserRole(user?.session?.user, 'gestion du personnel') &&
				checkUserRole(user?.session?.user, 'gestion patrimoine') && (
					<PersPatr />
				)}
			{checkUserRole(user?.session?.user, 'gestion du personnel') &&
				!checkUserRole(user?.session?.user, 'gestion patrimoine') && (
					<DashboardPersonnel />
				)}
			{!checkUserRole(user?.session?.user, 'gestion du personnel') &&
				checkUserRole(user?.session?.user, 'gestion patrimoine') && (
					<DashboardPatrimoine />
				)}
		</main>
	);
}
