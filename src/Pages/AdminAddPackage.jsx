import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminAddPackage = () => {
  const [form, setForm] = useState({
    title: '',
    type: '',
    price: '',
    days: '',
    rating: 4.5,
    image: '',
    description: '',
    details: '',
    gallery: [''],
    tourPlan: [{ day: 1, plan: '' }]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGalleryChange = (index, value) => {
    const updated = [...form.gallery];
    updated[index] = value;
    setForm(prev => ({ ...prev, gallery: updated }));
  };

  const addGalleryField = () => {
    setForm(prev => ({ ...prev, gallery: [...prev.gallery, ''] }));
  };

  const removeGalleryField = (index) => {
    const updated = form.gallery.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, gallery: updated }));
  };

  const handlePlanChange = (index, field, value) => {
    const updated = [...form.tourPlan];
    updated[index][field] = field === 'day' ? parseInt(value) : value;
    setForm(prev => ({ ...prev, tourPlan: updated }));
  };

  const addTourPlan = () => {
    setForm(prev => ({
      ...prev,
      tourPlan: [...prev.tourPlan, { day: form.tourPlan.length + 1, plan: '' }]
    }));
  };

  const removeTourPlan = (index) => {
    const updated = form.tourPlan.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, tourPlan: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPackage = {
        ...form,
        price: parseFloat(form.price),
        days: parseInt(form.days),
        rating: parseFloat(form.rating)
      };

      const res = await axios.post('https://bongo-tour-server.vercel.app/api/packages', newPackage);
      if (res.data.insertedId || res.data.acknowledged) {
        toast.success('Package added successfully');
        // Reset form
        setForm({
          title: '',
          type: '',
          price: '',
          days: '',
          rating: 4.5,
          image: '',
          description: '',
          details: '',
          gallery: [''],
          tourPlan: [{ day: 1, plan: '' }]
        });
      } else {
        toast.error('Failed to add package');
      }
    } catch (err) {
      toast.error('Server error while adding package');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Tour Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="title" className="input input-bordered w-full" placeholder="Title" value={form.title} onChange={handleInputChange} required />

        <input name="type" className="input input-bordered w-full" placeholder="Type (e.g. Beach, Hill)" value={form.type} onChange={handleInputChange} required />

        <input type="number" name="price" className="input input-bordered w-full" placeholder="Price" value={form.price} onChange={handleInputChange} required />

        <input type="number" name="days" className="input input-bordered w-full" placeholder="Days" value={form.days} onChange={handleInputChange} required />

        <input type="number" step="0.1" name="rating" className="input input-bordered w-full" placeholder="Rating (e.g. 4.5)" value={form.rating} onChange={handleInputChange} required />

        <input name="image" className="input input-bordered w-full" placeholder="Main Image URL" value={form.image} onChange={handleInputChange} required />

        <textarea name="description" className="textarea textarea-bordered w-full" rows={2} placeholder="Short Description" value={form.description} onChange={handleInputChange} required></textarea>

        <textarea name="details" className="textarea textarea-bordered w-full" rows={3} placeholder="Detailed Info" value={form.details} onChange={handleInputChange} required></textarea>

        {/* Gallery Section */}
        <div>
          <label className="font-semibold">Gallery Images:</label>
          {form.gallery.map((url, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                className="input input-bordered w-full"
                value={url}
                onChange={e => handleGalleryChange(index, e.target.value)}
                placeholder={`Gallery Image ${index + 1}`}
              />
              {index > 0 && (
                <button type="button" className="btn btn-sm btn-error" onClick={() => removeGalleryField(index)}>X</button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-outline" onClick={addGalleryField}>+ Add More</button>
        </div>

        {/* Tour Plan Section */}
        <div>
          <label className="font-semibold">Tour Plan:</label>
          {form.tourPlan.map((plan, index) => (
            <div key={index} className="mb-2 space-y-1">
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Day"
                value={plan.day}
                onChange={e => handlePlanChange(index, 'day', e.target.value)}
              />
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Plan description"
                value={plan.plan}
                onChange={e => handlePlanChange(index, 'plan', e.target.value)}
              />
              {index > 0 && (
                <button type="button" className="btn btn-sm btn-error mt-1" onClick={() => removeTourPlan(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-outline mt-1" onClick={addTourPlan}>+ Add Day</button>
        </div>

        <button className="btn bg-gray-950 hover:bg-gray-600 text-white rounded-lg w-full" type="submit">Add Package</button>
      </form>
    </div>
  );
};

export default AdminAddPackage;
