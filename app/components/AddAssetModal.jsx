"use client";
import React, { useState } from 'react';


const  AddAssetModal = ({ open, onClose, onCreate })=> {
const [form, setForm] = useState({ serialNumber: '', category: '', brand: '', model: '', status: 'In Use', location: '', assignedTo: '' });
const [submitting, setSubmitting] = useState(false);
const [error, setError] = useState('');


if (!open) return null;


const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


const handleSubmit = async (e) => {
e.preventDefault();
setSubmitting(true);
setError('');
const res = await onCreate(form);
setSubmitting(false);
if (res.ok) {
onClose();
setForm({ assetTag: '', category: '', brand: '', model: '', status: 'In Use', location: '', assignedTo: '' });
} else {
setError(res.error || 'Create failed');
}
};


return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
<h3 className="text-lg font-semibold mb-4">Add New Asset</h3>
{error && <div className="mb-2 text-red-600">{error}</div>}
<form onSubmit={handleSubmit} className="space-y-3">
<input name="assetTag" value={form.assetTag} onChange={handleChange} placeholder="S/N" className="w-full border rounded px-3 py-2" required />
<input name="category" value={form.category} onChange={handleChange} placeholder="Type (Laptop)" className="w-full border rounded px-3 py-2" required />
<input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="w-full border rounded px-3 py-2" />
<input name="model" value={form.model} onChange={handleChange} placeholder="Model" className="w-full border rounded px-3 py-2" />
<select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
<option>In Use</option>
<option>In Repair</option>
<option>Spare</option>
<option>Retired</option>
</select>
<input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border rounded px-3 py-2" />
<input name="assignedTo" value={form.assignedTo} onChange={handleChange} placeholder="Assigned To" className="w-full border rounded px-3 py-2" />


<div className="flex justify-end gap-2 pt-2">
<button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
<button disabled={submitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{submitting ? 'Adding...' : 'Add'}</button>
</div>
</form>
</div>
</div>
);
}




export default AddAssetModal;