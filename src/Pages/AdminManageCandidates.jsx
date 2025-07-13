import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminManageCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get('/api/guide-applications');
      setCandidates(res.data);
    } catch (err) {
        console.log(err);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (email) => {
    try {
      await axios.patch(`/api/guide-applications/accept/${email}`);
      toast.success('User promoted to Tour Guide');
      fetchCandidates();
    } catch {
      toast.error('Failed to accept application');
    }
  };

  const handleReject = async (email) => {
    const confirm = window.confirm('Are you sure to reject this application?');
    if (!confirm) return;

    try {
      await axios.delete(`/api/guide-applications/reject/${email}`);
      toast.success('Application rejected');
      fetchCandidates();
    } catch {
      toast.error('Failed to reject application');
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Guide Applications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : candidates.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Title</th>
              <th>Reason</th>
              <th>CV Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((app, idx) => (
              <tr key={app._id}>
                <td>{idx + 1}</td>
                <td>{app.name || 'N/A'}</td>
                <td>{app.email}</td>
                <td>{app.title}</td>
                <td className="max-w-sm overflow-hidden text-ellipsis">{app.reason}</td>
                <td>
                  <a href={app.cvLink} className="link text-blue-600 underline" target="_blank" rel="noreferrer">
                    View CV
                  </a>
                </td>
                <td className="flex gap-2">
                  <button onClick={() => handleAccept(app.email)} className="btn btn-success btn-xs">Accept</button>
                  <button onClick={() => handleReject(app.email)} className="btn btn-error btn-xs">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminManageCandidates;
