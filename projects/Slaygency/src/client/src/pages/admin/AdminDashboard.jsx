import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import Badge from '../../components/admin/Badge.jsx';
import ChartPlaceholder from '../../components/admin/ChartPlaceholder.jsx';
import StatCard from '../../components/admin/StatCard.jsx';
import TableSkeleton from '../../components/admin/TableSkeleton.jsx';
import { IconAlert, IconPatients, IconTrend, IconUsers } from '../../components/admin/icons.jsx';
import { listUsers, listPatients, getAlerts } from '../../services/apiService.js';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: 'Total Users', value: '—', trend: 'Loading...', tone: 'primary', icon: <IconUsers /> },
    {
      title: 'Total Patients',
      value: '—',
      trend: 'Loading...',
      tone: 'success',
      icon: <IconPatients />,
    },
    {
      title: 'Active Alerts',
      value: '—',
      trend: 'Loading...',
      tone: 'danger',
      icon: <IconAlert />,
    },
    {
      title: 'High Risk Cases',
      value: '—',
      trend: 'Calculating...',
      tone: 'warning',
      icon: <IconTrend />,
    },
  ]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [usersRes, patientsRes, alertsRes] = await Promise.allSettled([
          listUsers({ limit: 1 }),
          listPatients({ limit: 1 }),
          getAlerts({ limit: 5 }),
        ]);

        const totalUsers = usersRes.status === 'fulfilled' ? usersRes.value.total : 0;
        const totalPatients = patientsRes.status === 'fulfilled' ? patientsRes.value.total : 0;
        const alertData =
          alertsRes.status === 'fulfilled' ? alertsRes.value : { total: 0, items: [] };

        setStats([
          {
            title: 'Total Users',
            value: String(totalUsers),
            trend: 'Live from database',
            tone: 'primary',
            icon: <IconUsers />,
          },
          {
            title: 'Total Patients',
            value: String(totalPatients),
            trend: 'Live from database',
            tone: 'success',
            icon: <IconPatients />,
          },
          {
            title: 'Active Alerts',
            value: String(alertData.total),
            trend: `${alertData.items.length} shown`,
            tone: 'danger',
            icon: <IconAlert />,
          },
          {
            title: 'High Risk Cases',
            value: String(alertData.total || alertData.items.length),
            trend: 'Active high-priority alerts',
            tone: 'warning',
            icon: <IconTrend />,
          },
        ]);

        if (alertData.items?.length) {
          setActivities(
            alertData.items.slice(0, 4).map((a, i) => ({
              id: a._id || i,
              title: a.message || 'Alert',
              text: `Patient: ${a.patient?.name || 'Unknown'} — ${a.reasons?.join(', ') || 'No details'}`,
              tone: a.status === 'resolved' ? 'success' : 'danger',
            }))
          );
        } else {
          setActivities([
            {
              id: 1,
              title: 'System Online',
              text: 'No recent alerts. The system is healthy.',
              tone: 'success',
            },
          ]);
        }
      } catch {
        setActivities([
          {
            id: 1,
            title: 'Connection Issue',
            text: 'Could not fetch dashboard data. Check server connection.',
            tone: 'warning',
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
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
                Live data from your app backend.
              </p>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#355f9a]">
                Connected
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
                {activities.map((activity) => (
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
