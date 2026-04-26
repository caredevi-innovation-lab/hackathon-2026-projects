import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import Badge from '../components/admin/Badge.jsx';
import EmptyState from '../components/admin/EmptyState.jsx';
import TableSkeleton from '../components/admin/TableSkeleton.jsx';
import Toast from '../components/admin/Toast.jsx';

const initialPatients = [
  {
    id: 'P-1',
    name: 'Anjali Kumari',
    age: 24,
    risk: 'High',
    worker: 'Dr. Roshan',
    status: 'Assigned',
  },
  {
    id: 'P-2',
    name: 'Priyanka Thapa',
    age: 31,
    risk: 'Medium',
    worker: 'Dr. Anita',
    status: 'Assigned',
  },
  {
    id: 'P-3',
    name: 'Sita Magar',
    age: 28,
    risk: 'Low',
    worker: 'Not assigned',
    status: 'Pending',
  },
  {
    id: 'P-4',
    name: 'Roshni Gurung',
    age: 19,
    risk: 'High',
    worker: 'Dr. Sarah',
    status: 'Assigned',
  },
];

function riskTone(risk) {
  if (risk === 'High') {
    return 'danger';
  }
  if (risk === 'Medium') {
    return 'warning';
  }
  return 'success';
}

export default function PatientsPage() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState(initialPatients);
  const [query, setQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [toast, setToast] = useState({ show: false, text: '', tone: 'success' });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast.show) {
      return undefined;
    }
    const timer = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 1800);
    return () => clearTimeout(timer);
  }, [toast.show]);

  const filtered = useMemo(() => {
    return patients.filter((patient) => {
      const matchQuery = patient.name.toLowerCase().includes(query.toLowerCase());
      const matchRisk = riskFilter === 'All' || patient.risk === riskFilter;
      return matchQuery && matchRisk;
    });
  }, [patients, query, riskFilter]);

  const onAssign = (id, worker) => {
    setPatients((prev) =>
      prev.map((patient) => (patient.id === id ? { ...patient, worker } : patient))
    );
    setToast({ show: true, text: 'Worker assigned successfully.', tone: 'success' });
  };

  return (
    <AdminLayout
      title="Patient Management"
      subtitle="Monitor patient risk and assign field workers."
    >
      <Toast show={toast.show} text={toast.text} tone={toast.tone} />

      <section className="overflow-hidden rounded-2xl border border-[rgba(171,189,220,0.38)] bg-[linear-gradient(120deg,rgba(34,80,182,0.14)_0%,rgba(0,122,138,0.12)_100%)] px-5 py-4 shadow-[0_14px_30px_rgba(17,68,144,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 text-sm font-semibold text-[#1b4a85]">
            Monitor high-risk mothers and assign support teams faster.
          </p>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#355f9a]">
            Care ops
          </span>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#d8e3f2] bg-[rgba(255,255,255,0.75)] p-2 shadow-[0_10px_22px_rgba(17,68,144,0.07)] backdrop-blur-sm">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search patient"
              className="rounded-xl border border-[#d8e3f2] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d78d9]"
            />
            <select
              value={riskFilter}
              onChange={(event) => setRiskFilter(event.target.value)}
              className="rounded-xl border border-[#d8e3f2] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d78d9]"
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <p className="m-0 text-xs font-semibold text-[#6782aa]">
            {filtered.length} patients shown
          </p>
        </div>

        {loading ? (
          <TableSkeleton rows={5} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No patients found"
            message="Try adjusting your search or risk filter."
          />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#dbe4f3] bg-[rgba(255,255,255,0.78)] p-3 shadow-[0_12px_26px_rgba(17,68,144,0.08)] backdrop-blur-sm">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left">
              <thead>
                <tr className="text-xs font-semibold text-[#6a82a9]">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Age</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Assigned Worker</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((patient) => (
                  <tr
                    key={patient.id}
                    className={`${
                      patient.risk === 'High'
                        ? 'border border-[#f2ccd3] bg-[rgba(255,242,245,0.72)]'
                        : 'border border-[#e4ebf8] bg-white/80'
                    } rounded-xl`}
                  >
                    <td className="px-3 py-3 text-sm font-semibold text-[#1e467f]">
                      {patient.name}
                    </td>
                    <td className="px-3 py-3 text-sm text-[#5f789f]">{patient.age}</td>
                    <td className="px-3 py-3">
                      <Badge tone={riskTone(patient.risk)}>{patient.risk}</Badge>
                    </td>
                    <td className="px-3 py-3 text-sm text-[#5f789f]">{patient.worker}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          onChange={(event) => onAssign(patient.id, event.target.value)}
                          defaultValue={patient.worker}
                          className="rounded-lg border border-[#d6e1f2] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#41618d]"
                        >
                          <option>Not assigned</option>
                          <option>Dr. Roshan</option>
                          <option>Dr. Anita</option>
                          <option>Dr. Sarah</option>
                        </select>
                        <button
                          type="button"
                          className="rounded-lg border border-[#d6e1f2] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#41618d] hover:bg-[#f6faff]"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminLayout>
  );
}
