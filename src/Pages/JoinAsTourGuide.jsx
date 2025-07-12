import React, { useState } from 'react';
import toast from 'react-hot-toast';

const JoinAsTourGuide = () => {
  const [form, setForm] = useState({
    title: '',
    reason: '',
    cvLink: ''
  });
  const [successModal, setSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/apply-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        toast.success("Application submitted");
        setSuccessModal(true);
      } else {
        toast.error("Failed to apply");
      }
    } catch (err) {
      toast.error("Error occurred");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Apply to Become a Tour Guide</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          className="input input-bordered w-full"
          placeholder="Application Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="reason"
          className="textarea textarea-bordered w-full"
          rows={5}
          placeholder="Why do you want to be a guide?"
          value={form.reason}
          onChange={handleChange}
          required
        ></textarea>
        <input
          name="cvLink"
          type="url"
          className="input input-bordered w-full"
          placeholder="Link to your CV"
          value={form.cvLink}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-full" type="submit">Submit Application</button>
      </form>

      {successModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm text-center">
            <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
            <p className="text-sm mb-4">We'll get back to you soon.</p>
            <button className="btn btn-success" onClick={() => setSuccessModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinAsTourGuide;