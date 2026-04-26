import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import Badge from '../components/admin/Badge.jsx';
import EmptyState from '../components/admin/EmptyState.jsx';
import Modal from '../components/admin/Modal.jsx';
import TableSkeleton from '../components/admin/TableSkeleton.jsx';
import Toast from '../components/admin/Toast.jsx';
import { IconEdit, IconTrash } from '../components/admin/icons.jsx';
import { listUsers, updateUser, deleteUser as deleteUserApi } from '../services/apiService.js';

function statusTone(isActive) {
  return isActive ? 'success' : 'warning';
}

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({ show: false, text: '', tone: 'success' });
  const [editRole, setEditRole] = useState('Patient');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const params = { limit: 100 };
        if (role !== 'All') params.role = role;
        if (query) params.search = query;
        const res = await listUsers(params);
        setUsers(res.items || []);
      } catch {
        setToast({ show: true, text: 'Failed to load users from server.', tone: 'danger' });
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [role, query]);

  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2500);
    return () => clearTimeout(timer);
  }, [toast.show]);

  const filtered = useMemo(() => {
    return users.filter((user) => {
      const matchQuery = !query || user.name?.toLowerCase().includes(query.toLowerCase()) || user.email?.toLowerCase().includes(query.toLowerCase());
      const matchRole = role === 'All' || user.role === role;
      return matchQuery && matchRole;
    });
  }, [users, query, role]);

  const openEdit = (user) => {
    setSelectedUser(user);
    setEditRole(user.role);
  };

  const onSaveEdit = async () => {
    try {
      await updateUser(selectedUser.id, { role: editRole });
      setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? { ...u, role: editRole } : u)));
      setToast({ show: true, text: 'User role updated successfully.', tone: 'success' });
    } catch {
      setToast({ show: true, text: 'Failed to update user role.', tone: 'danger' });
    }
    setSelectedUser(null);
  };

  const onDelete = async (id) => {
    try {
      await deleteUserApi(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setToast({ show: true, text: 'User deactivated.', tone: 'danger' });
    } catch {
      setToast({ show: true, text: 'Failed to delete user.', tone: 'danger' });
    }
  };

  const onToggleStatus = async (user) => {
    try {
      const newActive = !user.isActive;
      await updateUser(user.id, { isActive: newActive });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, isActive: newActive } : u)));
      setToast({ show: true, text: `User ${newActive ? 'activated' : 'deactivated'}.`, tone: 'warning' });
    } catch {
      setToast({ show: true, text: 'Failed to update status.', tone: 'danger' });
    }
  };

  return (
    <AdminLayout title="User Management" subtitle="Manage user access, roles, and account status.">
      <Toast show={toast.show} text={toast.text} tone={toast.tone} />
      <section className="overflow-hidden rounded-2xl border border-[rgba(171,189,220,0.38)] bg-[linear-gradient(120deg,rgba(34,80,182,0.14)_0%,rgba(0,122,138,0.12)_100%)] px-5 py-4 shadow-[0_14px_30px_rgba(17,68,144,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 text-sm font-semibold text-[#1b4a85]">Role governance and access control overview.</p>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#355f9a]">Live data</span>
        </div>
      </section>
      <section className="grid gap-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex w-full flex-wrap items-center gap-3 rounded-2xl border border-[#cfddf1] bg-white p-3 shadow-[0_12px_24px_rgba(17,68,144,0.08)] lg:w-auto">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or email" className="w-full rounded-xl border border-[#c9d9ef] bg-white px-4 py-3 text-base text-[#214371] outline-none placeholder:text-[#7b8fae] focus:border-[#2d78d9] lg:min-w-[360px]" />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-xl border border-[#c9d9ef] bg-white px-4 py-3 text-base text-[#214371] outline-none focus:border-[#2d78d9]">
              <option>All</option>
              <option>Admin</option>
              <option>Doctor</option>
              <option>Patient</option>
            </select>
          </div>
          <p className="m-0 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#4a6793] shadow-[0_6px_14px_rgba(17,68,144,0.08)]">{filtered.length} users found</p>
        </div>
        {loading ? (
          <TableSkeleton rows={5} />
        ) : filtered.length === 0 ? (
          <EmptyState title="No users found" message="Try changing your filters or search query." />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#d6e2f3] bg-white p-3 shadow-[0_14px_28px_rgba(17,68,144,0.1)]">
            <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left">
              <thead>
                <tr className="text-sm font-semibold text-[#4f6790]">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="rounded-xl border border-[#e0e8f6] bg-white transition duration-200 hover:bg-[#f7faff]">
                    <td className="px-3 py-3 text-sm font-semibold text-[#1e467f]">{user.name}</td>
                    <td className="px-3 py-3 text-sm text-[#4f6990]">{user.email}</td>
                    <td className="px-3 py-3 text-sm font-medium text-[#355581]">{user.role}</td>
                    <td className="px-3 py-3"><Badge tone={statusTone(user.isActive)}>{user.isActive ? 'Active' : 'Inactive'}</Badge></td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button type="button" onClick={() => openEdit(user)} className="inline-flex items-center gap-1 rounded-lg border border-[#cddcf1] bg-white px-3 py-2 text-xs font-semibold text-[#345886] hover:bg-[#f3f8ff]"><IconEdit />Edit</button>
                        <button type="button" onClick={() => onToggleStatus(user)} className="rounded-lg border border-[#cddcf1] bg-white px-3 py-2 text-xs font-semibold text-[#345886] hover:bg-[#f3f8ff]">Toggle</button>
                        <button type="button" onClick={() => onDelete(user.id)} className="inline-flex items-center gap-1 rounded-lg border border-[#f0c8cf] bg-[#fff6f8] px-3 py-2 text-xs font-semibold text-[#b54057] hover:bg-[#ffeff3]"><IconTrash />Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <Modal open={Boolean(selectedUser)} title="Edit User Role" onClose={() => setSelectedUser(null)} onConfirm={onSaveEdit} confirmText="Save Changes">
        <div className="grid gap-2">
          <p className="m-0 text-sm text-[#60799f]">{selectedUser?.name}</p>
          <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className="rounded-xl border border-[#d8e3f2] bg-[#f9fbff] px-3 py-2 text-sm outline-none focus:border-[#2d78d9]">
            <option>Admin</option>
            <option>Doctor</option>
            <option>Patient</option>
          </select>
        </div>
      </Modal>
    </AdminLayout>
  );
}
