export default function RiskExplanation({ reasons = [] }) {
	if (!reasons.length) {
		return <p>No risk explanations available.</p>;
	}

	return (
		<ul>
			{reasons.map((reason) => (
				<li key={reason}>{reason}</li>
			))}
		</ul>
	);
}
