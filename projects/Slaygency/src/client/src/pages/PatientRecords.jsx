// Sidebar now provided by AppLayout

const patients = [
  {
    name: 'Anisha Thapa',
    id: '#PAT-98421',
    week: 32,
    risk: 'High Risk',
    riskColor: 'bg-[#ff4d6d]/10 text-[#ff4d6d]',
    bp: '145/95',
    bpStatus: 'Elevated',
    bpColor: 'text-[#ff4d6d]',
    lastVisit: 'Oct 24, 2023',
  },
  {
    name: 'Sunita Gurung',
    id: '#PAT-95133',
    week: 14,
    risk: 'Low Risk',
    riskColor: 'bg-[#16a34a]/10 text-[#16a34a]',
    bp: '118/78',
    bpStatus: 'Normal',
    bpColor: 'text-[#16a34a]',
    lastVisit: 'Oct 26, 2023',
  },
  {
    name: 'Priyanka Pariyar',
    id: '#PAT-98012',
    week: 24,
    risk: 'Medium Risk',
    riskColor: 'bg-[#fbbf24]/10 text-[#f59e42]',
    bp: '128/84',
    bpStatus: 'Stable',
    bpColor: 'text-[#f59e42]',
    lastVisit: 'Oct 25, 2023',
  },
  {
    name: 'Deepa Shrestha',
    id: '#PAT-97909',
    week: 38,
    risk: 'Low Risk',
    riskColor: 'bg-[#16a34a]/10 text-[#16a34a]',
    bp: '115/75',
    bpStatus: 'Normal',
    bpColor: 'text-[#16a34a]',
    lastVisit: 'Oct 27, 2023',
  },
];

export default function PatientRecords() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full text-[#20253d]">
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-[rgba(134,132,188,0.16)] bg-white/80 px-4 py-4 backdrop-blur-[20px] sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:py-[0.85rem]">
          <input
            type="text"
            placeholder="Global patient search (ID, Name, or Phone)..."
            className="flex-1 min-w-[220px] max-w-[340px] rounded-full bg-[#f3f4fa] px-4 py-3.5 text-[#8e95ac] border-0 outline-none"
          />
          <div className="flex gap-2">
            <button className="rounded-lg bg-[#f4f6ff] px-4 py-2 text-[#433cff] font-semibold">
              EN
            </button>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#20253d]">Dr. Sharma</span>
              <span className="text-xs text-[#8e95ac]">Senior Obstetrician</span>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#433cff] to-[#4ed7cc] text-white font-semibold">
                DS
              </div>
            </div>
          </div>
        </header>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-6 sm:px-7">
          <div className="flex gap-2">
            <button className="rounded-full px-4 py-2 font-semibold bg-[#433cff] text-white">
              All Patients (124)
            </button>
            <button className="rounded-full px-4 py-2 font-semibold bg-[#f4f6ff] text-[#433cff]">
              High Risk (18)
            </button>
            <button className="rounded-full px-4 py-2 font-semibold bg-[#f4f6ff] text-[#433cff]">
              Recently Added
            </button>
            <button className="rounded-full px-4 py-2 font-semibold bg-[#f4f6ff] text-[#433cff]">
              Active Monitoring <span className="ml-1 text-[#433cff]">84 Patients</span>
            </button>
            <button className="rounded-full px-4 py-2 font-semibold bg-[#f4f6ff] text-[#433cff]">
              Advanced Filter
            </button>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg bg-[#f4f6ff] px-4 py-2 text-[#433cff] font-semibold">
              Export Report
            </button>
            <button className="rounded-lg bg-[#433cff] px-4 py-2 text-white font-semibold">
              Register New Patient
            </button>
          </div>
        </div>

        {/* Patient Table */}
        <div className="mt-6 px-4 sm:px-7">
          <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
            <table className="min-w-full divide-y divide-[#e6e9f7]">
              <thead className="bg-[#f7f8ff]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#8e95ac]">
                    PATIENT NAME & ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#8e95ac]">
                    PREGNANCY WEEK
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#8e95ac]">
                    RISK STATUS
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#8e95ac]">
                    LATEST BP
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#8e95ac]">
                    LAST VISIT
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#8e95ac]">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e9f7]">
                {patients.map((p) => (
                  <tr key={p.id} className="hover:bg-[#f8f9ff] transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#433cff] to-[#4ed7cc] text-white font-semibold">
                        {p.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-[#20253d]">{p.name}</div>
                        <div className="text-xs text-[#8e95ac]">{p.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#433cff]">Week {p.week}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${p.riskColor}`}
                      >
                        {p.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${p.bpColor}`}>{p.bp}</span>
                      <span className="ml-2 text-xs text-[#8e95ac]">{p.bpStatus}</span>
                    </td>
                    <td className="px-6 py-4 text-[#8e95ac]">{p.lastVisit}</td>
                    <td className="px-6 py-4">
                      <button className="text-[#433cff] font-semibold hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#f7f8ff] border-t border-[#e6e9f7]">
              <span className="text-xs text-[#8e95ac]">Showing 1 to 4 of 124 patients</span>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded bg-white border border-[#e6e9f7] text-[#433cff] font-semibold">
                  1
                </button>
                <button className="w-8 h-8 rounded bg-white border border-[#e6e9f7] text-[#433cff]">
                  2
                </button>
                <button className="w-8 h-8 rounded bg-white border border-[#e6e9f7] text-[#433cff]">
                  3
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-4 sm:px-7 pb-8">
          {/* Clinic Alert */}
          <div className="rounded-2xl bg-[#433cff] text-white p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="text-lg font-semibold mb-2">
                3 High-Risk patients haven't visited this week
              </div>
              <button className="mt-2 rounded-lg bg-white/20 px-4 py-2 font-semibold">
                Send Reminders
              </button>
            </div>
          </div>
          {/* BP Stability */}
          <div className="rounded-2xl bg-white p-6 shadow-lg flex flex-col justify-between">
            <div className="text-xs text-[#8e95ac] font-semibold mb-1">
              REGIONAL AVG. COMPARISON
            </div>
            <div className="text-3xl font-semibold text-[#433cff] mb-1">Maternal BP Stability</div>
            <div className="text-2xl font-semibold text-[#16a34a]">
              84% <span className="text-xs text-[#16a34a]">+2.4%</span>
            </div>
            <div className="text-xs text-[#8e95ac]">
              Performing better than Bagmati regional average (75%)
            </div>
          </div>
          {/* Upcoming Follow-ups */}
          <div className="rounded-2xl bg-white p-6 shadow-lg flex flex-col justify-between">
            <div className="text-xs text-[#8e95ac] font-semibold mb-1">UPCOMING FOLLOW-UPS</div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span>Today</span>
                <span className="font-semibold text-[#433cff]">12 Appointments</span>
              </div>
              <div className="flex justify-between">
                <span>Tomorrow</span>
                <span className="font-semibold text-[#433cff]">16 Appointments</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

