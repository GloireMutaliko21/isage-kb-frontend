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
				checkUserRole(user?.session?.user, 'gestion patrimoine') &&
				!checkUserRole(user?.session?.user, 'admin') && <PersPatr />}
			{checkUserRole(user?.session?.user, 'gestion du personnel') &&
				!checkUserRole(user?.session?.user, 'gestion patrimoine') &&
				!checkUserRole(user?.session?.user, 'admin') && <DashboardPersonnel />}
			{!checkUserRole(user?.session?.user, 'gestion du personnel') &&
				!checkUserRole(user?.session?.user, 'admin') &&
				checkUserRole(user?.session?.user, 'gestion patrimoine') && (
					<DashboardPatrimoine />
				)}
			{checkUserRole(user?.session?.user, 'admin') && <p>aDMIN</p>}
		</main>
	);
}
