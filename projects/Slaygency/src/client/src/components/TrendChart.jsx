export default function TrendChart({ records = [] }) {
	if (!records.length) return <p>No trend data available.</p>;

	return (
		<table>
			<thead>
				<tr>
					<th>Date</th>
					<th>Risk Level</th>
					<th>Risk Score</th>
				</tr>
			</thead>
			<tbody>
				{records.map((r) => (
					<tr key={r._id || `${r.submittedAt}-${r.riskScore}`}>
						<td>{new Date(r.submittedAt).toLocaleDateString()}</td>
						<td>{r.riskLevel}</td>
						<td>{r.riskScore}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
