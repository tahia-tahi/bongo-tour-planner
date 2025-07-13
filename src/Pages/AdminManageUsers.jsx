import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'tourist', label: 'Tourist' },
  { value: 'tour_guide', label: 'Tour Guide' },
  { value: 'admin', label: 'Admin' }
];

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState(roleOptions[0]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (search = '', role = '') => {
    setLoading(true);
    try {
      const res = await axios.get('/api/users', {
        params: {
          search,
          role
        }
      });
      setUsers(res.data);
    } catch (err) {
        console.log(err);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = debounce((text) => {
    setSearchText(text);
    fetchUsers(text, roleFilter.value);
  }, 500);

  const handleRoleChange = (selectedOption) => {
    setRoleFilter(selectedOption);
    fetchUsers(searchText, selectedOption.value);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full md:w-1/3"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <Select
          className="w-full md:w-1/4"
          value={roleFilter}
          onChange={handleRoleChange}
          options={roleOptions}
        />
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.photo ? (
                      <img src={user.photo} alt="user" className="w-12 h-12 rounded-full" />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminManageUsers;
