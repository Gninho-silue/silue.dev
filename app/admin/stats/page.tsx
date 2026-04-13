import { redirect } from 'next/navigation';
import AdminDashboard from './AdminDashboard';

export const metadata = { robots: 'noindex, nofollow' };

interface Props {
  searchParams: Promise<{ password?: string }>;
}

export default async function AdminStatsPage({ searchParams }: Props) {
  const params = await searchParams;
  const password = params.password;
  const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  if (!password || !expectedPassword || password !== expectedPassword) {
    redirect('/');
  }

  return <AdminDashboard />;
}
