import { RISK_BADGE_CLASSES } from '../utils/riskColors.js';

/**
 * Color-coded risk level badge.
 * High = Red, Moderate = Yellow/Amber, Low = Green
 */
export default function RiskBadge({ level = 'Low' }) {
	const classes = RISK_BADGE_CLASSES[level] || RISK_BADGE_CLASSES.Unknown;

	return (
		<span
			className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${classes}`}
		>
			{level}
		</span>
	);
}

