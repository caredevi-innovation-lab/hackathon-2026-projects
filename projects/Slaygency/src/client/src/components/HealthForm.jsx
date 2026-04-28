import { useState } from 'react';

const initialState = {
	age: 25,
	bpSystolic: 120,
	bpDiastolic: 80,
	hemoglobin: 11.5,
	symptoms: '',
	priorHypertension: false,
};

export default function HealthForm({ onSubmit, loading }) {
	const [form, setForm] = useState(initialState);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			...form,
			age: Number(form.age),
			bpSystolic: Number(form.bpSystolic),
			bpDiastolic: Number(form.bpDiastolic),
			hemoglobin: Number(form.hemoglobin),
			symptoms: form.symptoms
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean),
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" />
			<input name="bpSystolic" type="number" value={form.bpSystolic} onChange={handleChange} placeholder="Systolic" />
			<input name="bpDiastolic" type="number" value={form.bpDiastolic} onChange={handleChange} placeholder="Diastolic" />
			<input name="hemoglobin" type="number" step="0.1" value={form.hemoglobin} onChange={handleChange} placeholder="Hemoglobin" />
			<input name="symptoms" value={form.symptoms} onChange={handleChange} placeholder="Symptoms (comma separated)" />
			<label>
				<input name="priorHypertension" type="checkbox" checked={form.priorHypertension} onChange={handleChange} /> Prior Hypertension
			</label>
			<button disabled={loading} type="submit">{loading ? 'Submitting...' : 'Submit'}</button>
		</form>
	);
}
