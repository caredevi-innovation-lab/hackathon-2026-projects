import PageHeader from '../ui/PageHeader.jsx';

/**
 * AdminLayout — now a thin wrapper that provides consistent page padding
 * and title. The sidebar + topbar are handled by AppLayout in App.jsx.
 */
export default function AdminLayout({ title, subtitle, children }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="grid gap-5">{children}</div>
    </div>
  );
}
