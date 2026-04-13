'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import Link from 'next/link';

const weeklyData = [
  { day: 'Mon', visits: 120 },
  { day: 'Tue', visits: 85 },
  { day: 'Wed', visits: 200 },
  { day: 'Thu', visits: 150 },
  { day: 'Fri', visits: 180 },
  { day: 'Sat', visits: 220 },
  { day: 'Sun', visits: 195 },
];

const referrers = [
  { name: 'LinkedIn', percent: 42 },
  { name: 'GitHub', percent: 28 },
  { name: 'Google', percent: 19 },
  { name: 'Direct', percent: 11 },
];

const deviceData = [
  { name: 'Desktop', value: 65 },
  { name: 'Mobile', value: 30 },
  { name: 'Tablet', value: 5 },
];

const PIE_COLORS = ['#2453D3', '#4ade80', '#f59e0b'];

const statsCards = [
  { label: 'Total Views', value: '—' },
  { label: 'Unique Visitors', value: '—' },
  { label: 'Most Visited Page', value: '—' },
  { label: 'Top Country', value: '—' },
];

export default function AdminDashboard() {
  const lastUpdated = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Site Analytics
          </h1>
          <p className="text-sm text-gray-400 mt-1">Last updated: {lastUpdated}</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#2453D3] hover:text-blue-400 transition-colors"
        >
          ← Back to site
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statsCards.map(({ label, value }) => (
          <div
            key={label}
            className="bg-[#111118] border border-white/10 rounded-xl p-5 flex flex-col gap-2"
          >
            <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
            <span className="text-2xl font-bold text-white">{value}</span>
            <span className="text-[11px] text-gray-500 leading-tight">
              Connect Vercel Analytics API for live data
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Bar Chart */}
        <div className="bg-[#111118] border border-white/10 rounded-xl p-6">
          <h2 className="text-base font-semibold text-white mb-6">
            Last 7 Days — Visits
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} barSize={28}>
              <XAxis
                dataKey="day"
                stroke="#555"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#555"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={35}
              />
              <Tooltip
                contentStyle={{
                  background: '#1a1a24',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="visits" fill="#2453D3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#111118] border border-white/10 rounded-xl p-6">
          <h2 className="text-base font-semibold text-white mb-6">
            Device Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {deviceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#1a1a24',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value) => [`${value ?? 0}%`, '']}
              />
              <Legend
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span style={{ color: '#9ca3af', fontSize: 13 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Referrers */}
      <div className="bg-[#111118] border border-white/10 rounded-xl p-6 mb-10">
        <h2 className="text-base font-semibold text-white mb-6">Top Referrers</h2>
        <div className="flex flex-col gap-4">
          {referrers.map(({ name, percent }) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-20 text-sm text-gray-300 shrink-0">{name}</span>
              <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#2453D3]"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-10 text-right text-sm text-gray-400">{percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vercel Dashboard Link */}
      <div className="flex justify-center">
        <a
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#2453D3] hover:bg-blue-600 transition-colors text-white font-medium px-6 py-3 rounded-lg text-sm"
        >
          Open Vercel Dashboard ↗
        </a>
      </div>
    </div>
  );
}
