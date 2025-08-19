import React, { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthContext';

const JoinAsTourGuide = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    photo: '',
    title: '',
    reason: '',
    cvLink: ''
  });
  const [successModal, setSuccessModal] = useState(false);
  const [submitted, setSubmitted] = useState(false); // 🚨 disable button after submit

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || '',
        photo: user.photoURL || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://bongo-tour-server.vercel.app/api/apply-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        toast.success("Application submitted");
        setSuccessModal(true);
        setSubmitted(true); // ✅ disable the button after successful submit
      } else {
        toast.error("Failed to apply");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error occurred");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Apply to Become a Tour Guide</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          className="input input-bordered w-full"
          placeholder="Your Name"
          value={form.name}
          disabled
        />
        <input
          name="email"
          type="email"
          className="input input-bordered w-full"
          placeholder="Your Email"
          value={form.email}
          disabled
        />
        {form.photo && (
          <div className="w-16 h-16 rounded-full overflow-hidden ">
            <img src={form.photo} alt="User" className="w-full h-full object-cover" />
          </div>
        )}
        <input
          name="title"
          className="input input-bordered w-full"
          placeholder="Application Title"
          value={form.title}
          onChange={handleChange}
          required
          disabled={submitted}
        />
        <textarea
          name="reason"
          className="textarea textarea-bordered w-full"
          rows={5}
          placeholder="Why do you want to be a guide?"
          value={form.reason}
          onChange={handleChange}
          required
          disabled={submitted}
        ></textarea>
        <input
          name="cvLink"
          type="url"
          className="input input-bordered w-full"
          placeholder="Link to your CV"
          value={form.cvLink}
          onChange={handleChange}
          required
          disabled={submitted}
        />
        <button
          className="btn bg-gray-950 hover:bg-gray-600 text-white rounded-lg w-full"
          type="submit"
          disabled={submitted}
        >
          {submitted ? "Application Submitted" : "Submit Application"}
        </button>
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
