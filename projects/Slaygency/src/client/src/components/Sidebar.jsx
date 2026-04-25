const navItems = [
	'Overview',
	'Patient Records',
	'Risk Monitoring',
	'Community Outreach',
	'Health Reports',
	'Settings'
];

export default function Sidebar() {
	return (
		<aside className="flex flex-col rounded-[22px] border border-[#eceef5] bg-[#f6f7fc] p-4 shadow-[0_18px_45px_rgba(34,43,78,0.06)] lg:order-1 order-2">
			<div className="mb-1 text-[1.1rem] font-extrabold text-[#2643d8]">
				AamaCare
				<small className="block text-[0.68rem] font-semibold tracking-[0.04em] text-[#6971a6]">
					Healthcare Portal
				</small>
			</div>

			<nav className="mt-4 grid gap-2" aria-label="Patient navigation">
				{navItems.map((item) => (
					<button
						key={item}
						type="button"
						className={`rounded-[11px] px-3 py-2 text-left text-[0.88rem] font-semibold ${
							item === 'Risk Monitoring'
								? 'bg-[rgba(64,93,241,0.11)] text-[#3752ec]'
								: 'text-[#5f668d] hover:bg-[rgba(64,93,241,0.07)]'
						}`}
					>
						{item}
					</button>
				))}
			</nav>

			<div className="mt-auto grid gap-2">
				<button
					className="cursor-pointer rounded-xl border-0 bg-[#4a44dc] px-3 py-3 text-[0.82rem] font-bold text-white"
					type="button"
				>
					Add Health Data
				</button>
				<button
					className="cursor-pointer rounded-xl border border-[#e6e9f5] bg-white px-3 py-3 text-[0.82rem] font-bold text-[#5f668d]"
					type="button"
				>
					Help Center
				</button>
				<button
					className="cursor-pointer rounded-xl border border-[#e6e9f5] bg-white px-3 py-3 text-[0.82rem] font-bold text-[#5f668d]"
					type="button"
				>
					Sign Out
				</button>
			</div>
		</aside>
	);
}
