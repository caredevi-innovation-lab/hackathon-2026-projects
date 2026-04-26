import AdminTopbar from './AdminTopbar.jsx';

export default function AdminLayout({ title, subtitle, children }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,80,182,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(0,122,138,0.1),transparent_32%),linear-gradient(180deg,#f6f9ff_0%,#eef4fb_100%)] text-[#10264d]">
      <section className="mx-auto max-w-7xl p-3 sm:p-5 lg:p-6">
        <div className="grid gap-4">
          <AdminTopbar title={title} subtitle={subtitle} />
          {children}
        </div>
      </section>
    </main>
  );
}
