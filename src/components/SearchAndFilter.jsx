// src/components/SearchAndFilter.jsx
import React, { useState } from 'react';

const SearchAndFilter = ({ onSearchChange, onRoleChange, selectedRole }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleRoleFilter = (e) => {
    const value = e.target.value;
    onRoleChange(value);
  };

  return (
    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau email..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>
          <select
            value={selectedRole}
            onChange={handleRoleFilter}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <option value="">Semua Peran</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Editor">Editor</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
