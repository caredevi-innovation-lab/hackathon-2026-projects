import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import Badge from '../components/admin/Badge.jsx';
import EmptyState from '../components/admin/EmptyState.jsx';
import Modal from '../components/admin/Modal.jsx';
import TableSkeleton from '../components/admin/TableSkeleton.jsx';
import Toast from '../components/admin/Toast.jsx';
import { IconEdit, IconTrash } from '../components/admin/icons.jsx';

const initialUsers = [
  {
    id: 'U-1',
    name: 'Dr. Ramesh Thapa',
    email: 'dr.ramesh@aamacare.org',
    role: 'Doctor',
    status: 'Active',
  },
  {
    id: 'U-2',
    name: 'Anjali Sharma',
    email: 'anjali@aamacare.org',
    role: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'U-3',
    name: 'Pradip Kumar',
    email: 'pradip@aamacare.org',
    role: 'Worker',
    status: 'Active',
  },
  {
    id: 'U-4',
    name: 'Sita Gurung',
    email: 'sita@aamacare.org',
    role: 'Doctor',
    status: 'Active',
  },
  {
    id: 'U-5',
    name: 'Mina Rai',
    email: 'mina@aamacare.org',
    role: 'Worker',
    status: 'Inactive',
  },
];

function statusTone(status) {
  return status === 'Active' ? 'success' : 'warning';
}

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({ show: false, text: '', tone: 'success' });
  const [editRole, setEditRole] = useState('Worker');

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
    return users.filter((user) => {
      const matchQuery =
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase());
      const matchRole = role === 'All' || user.role === role;
      return matchQuery && matchRole;
    });
  }, [users, query, role]);

  const openEdit = (user) => {
    setSelectedUser(user);
    setEditRole(user.role);
  };

  const onSaveEdit = () => {
    setUsers((prev) =>
      prev.map((user) => (user.id === selectedUser.id ? { ...user, role: editRole } : user))
    );
    setSelectedUser(null);
    setToast({ show: true, text: 'User role updated successfully.', tone: 'success' });
  };

  const onDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setToast({ show: true, text: 'User deleted.', tone: 'danger' });
  };

  const onToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
    setToast({ show: true, text: 'User status updated.', tone: 'warning' });
  };

  return (
    <AdminLayout title="User Management" subtitle="Manage user access, roles, and account status.">
      <Toast show={toast.show} text={toast.text} tone={toast.tone} />

      <section className="overflow-hidden rounded-2xl border border-[rgba(171,189,220,0.38)] bg-[linear-gradient(120deg,rgba(34,80,182,0.14)_0%,rgba(0,122,138,0.12)_100%)] px-5 py-4 shadow-[0_14px_30px_rgba(17,68,144,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 text-sm font-semibold text-[#1b4a85]">
            Role governance and access control overview.
          </p>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#355f9a]">
            Audit ready
          </span>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#d8e3f2] bg-[rgba(255,255,255,0.75)] p-2 shadow-[0_10px_22px_rgba(17,68,144,0.07)] backdrop-blur-sm">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or email"
              className="rounded-xl border border-[#d8e3f2] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d78d9]"
            />
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="rounded-xl border border-[#d8e3f2] bg-white px-3 py-2 text-sm outline-none focus:border-[#2d78d9]"
            >
              <option>All</option>
              <option>Admin</option>
              <option>Doctor</option>
              <option>Worker</option>
            </select>
          </div>
          <p className="m-0 text-xs font-semibold text-[#6782aa]">{filtered.length} users found</p>
        </div>

        {loading ? (
          <TableSkeleton rows={5} />
        ) : filtered.length === 0 ? (
          <EmptyState title="No users found" message="Try changing your filters or search query." />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#dbe4f3] bg-[rgba(255,255,255,0.78)] p-3 shadow-[0_12px_26px_rgba(17,68,144,0.08)] backdrop-blur-sm">
            <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left">
              <thead>
                <tr className="text-xs font-semibold text-[#6a82a9]">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="rounded-xl border border-[#e4ebf8] bg-white/80">
                    <td className="px-3 py-3 text-sm font-semibold text-[#1e467f]">{user.name}</td>
                    <td className="px-3 py-3 text-sm text-[#5f789f]">{user.email}</td>
                    <td className="px-3 py-3 text-sm text-[#3f5f89]">{user.role}</td>
                    <td className="px-3 py-3">
                      <Badge tone={statusTone(user.status)}>{user.status}</Badge>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(user)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#d6e1f2] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#41618d] hover:bg-[#f6faff]"
                        >
                          <IconEdit />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleStatus(user.id)}
                          className="rounded-lg border border-[#d6e1f2] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#41618d] hover:bg-[#f6faff]"
                        >
                          Toggle
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(user.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#f0c8cf] bg-[#fff6f8] px-2.5 py-1.5 text-xs font-semibold text-[#b54057] hover:bg-[#ffeff3]"
                        >
                          <IconTrash />
                          Delete
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

      <Modal
        open={Boolean(selectedUser)}
        title="Edit User Role"
        onClose={() => setSelectedUser(null)}
        onConfirm={onSaveEdit}
        confirmText="Save Changes"
      >
        <div className="grid gap-2">
          <p className="m-0 text-sm text-[#60799f]">{selectedUser?.name}</p>
          <select
            value={editRole}
            onChange={(event) => setEditRole(event.target.value)}
            className="rounded-xl border border-[#d8e3f2] bg-[#f9fbff] px-3 py-2 text-sm outline-none focus:border-[#2d78d9]"
          >
            <option>Admin</option>
            <option>Doctor</option>
            <option>Worker</option>
          </select>
        </div>
      </Modal>
    </AdminLayout>
  );
}
