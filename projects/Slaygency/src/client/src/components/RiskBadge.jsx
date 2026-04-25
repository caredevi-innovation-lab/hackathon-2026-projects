import { riskLevelColor } from '../utils/riskColors.js';

export default function RiskBadge({ level = 'Low' }) {
	return (
		<span
			style={{
				backgroundColor: riskLevelColor(level),
				color: '#fff',
				borderRadius: '999px',
				padding: '0.2rem 0.75rem',
				fontWeight: 700,
			}}
		>
			{level}
		</span>
	);
}
