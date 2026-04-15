import { redirect } from 'next/navigation';
import { checkPassword } from './actions';
import AdminDashboard from './AdminDashboard';

export const metadata = { robots: 'noindex, nofollow' };

interface Props {
  searchParams: Promise<{ password?: string }>;
}

export default async function AdminStatsPage({ searchParams }: Props) {
  const params = await searchParams;
  const password = params.password ?? '';

  const valid = await checkPassword(password);
  if (!valid) {
    redirect('/');
  }

  return <AdminDashboard />;
}
