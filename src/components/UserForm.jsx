// src/components/UserForm.jsx
import React, { useState } from 'react';
import { useAddUser } from '../hooks/useUserQuery';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
  });
  const { mutate: addUser, isPending } = useAddUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Nama dan email wajib diisi!');
      return;
    }
    addUser(formData);
    setFormData({ name: '', email: '', role: 'User' }); // Reset
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f0f8ff',
        borderRadius: '8px',
        border: '1px solid #c0d8f3',
      }}
    >
      <h3 style={{ margin: '0 0 1rem 0', color: '#0057b8' }}>➕ Tambah Pengguna Baru</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
        </select>
        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: '0.5rem 1rem',
            background: '#0057b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer',
          }}
        >
          {isPending ? 'Menambahkan...' : 'Tambahkan'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
