import { useEffect, useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import Badge from '../components/admin/Badge.jsx';
import ChartPlaceholder from '../components/admin/ChartPlaceholder.jsx';
import StatCard from '../components/admin/StatCard.jsx';
import TableSkeleton from '../components/admin/TableSkeleton.jsx';
import { IconAlert, IconPatients, IconTrend, IconUsers } from '../components/admin/icons.jsx';

const stats = [
  {
    title: 'Total Users',
    value: '1,240',
    trend: '+5% from last month',
    tone: 'primary',
    icon: <IconUsers />,
  },
  {
    title: 'Total Patients',
    value: '8,450',
    trend: '+12% from last month',
    tone: 'success',
    icon: <IconPatients />,
  },
  {
    title: 'Active Alerts',
    value: '42',
    trend: '7 high-priority pending',
    tone: 'danger',
    icon: <IconAlert />,
  },
  {
    title: 'High Risk Cases',
    value: '156',
    trend: '+8% from last week',
    tone: 'warning',
    icon: <IconTrend />,
  },
];

const recentActivities = [
  {
    id: 1,
    title: 'New Doctor Registered',
    text: 'Dr. Asha KC joined and was assigned to Kathmandu zone.',
    tone: 'primary',
  },
  {
    id: 2,
    title: 'Critical Alert Triggered',
    text: 'Patient Priyanka Thapa flagged with high BP and swelling.',
    tone: 'danger',
  },
  {
    id: 3,
    title: 'Alert Resolved',
    text: 'Daily vitals follow-up alert resolved by nurse coordinator.',
    tone: 'success',
  },
  {
    id: 4,
    title: 'Sync Completed',
    text: 'District health records synced successfully 2 minutes ago.',
    tone: 'warning',
  },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Real-time monitoring of maternal health metrics across active regions."
    >
      {loading ? (
        <TableSkeleton rows={6} />
      ) : (
        <>
          <section className="overflow-hidden rounded-2xl border border-[rgba(171,189,220,0.38)] bg-[linear-gradient(120deg,rgba(34,80,182,0.16)_0%,rgba(0,122,138,0.14)_100%)] px-5 py-4 shadow-[0_14px_30px_rgba(17,68,144,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="m-0 text-sm font-semibold text-[#1b4a85]">
                Live regional summary is healthy with moderate alert density.
              </p>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#355f9a]">
                Updated 2 mins ago
              </span>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <StatCard key={item.title} {...item} />
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
            <ChartPlaceholder />

            <article className="rounded-2xl border border-[#dbe4f3] bg-[rgba(255,255,255,0.75)] p-5 shadow-[0_12px_26px_rgba(17,68,144,0.08)] backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="m-0 text-lg font-semibold text-[#163a6f]">System Activity</h3>
                <a
                  className="text-xs font-semibold text-[#365fc0] no-underline"
                  href="/admin/alerts"
                >
                  View all
                </a>
              </div>

              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-xl border border-[#e5ecf8] bg-white/80 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="m-0 text-sm font-semibold text-[#1e467f]">{activity.title}</p>
                      <Badge tone={activity.tone}>{activity.tone}</Badge>
                    </div>
                    <p className="m-0 mt-1 text-xs leading-5 text-[#60799f]">{activity.text}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </>
      )}
    </AdminLayout>
  );
}
