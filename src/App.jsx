// src/App.jsx
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import SearchAndFilter from './components/SearchAndFilter';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

import './index.css';

const queryClient = new QueryClient();

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#0057b8' }}>
          📋 Aplikasi Manajemen Pengguna
        </h1>

        <SearchAndFilter
          onSearchChange={setSearchQuery}
          onRoleChange={setRoleFilter}
          selectedRole={roleFilter}
        />

        <UserForm />

        <UserTable />

        {/* DevTools (opsional, bisa dihapus di production) */}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </div>
    </QueryClientProvider>
  );
}

export default App;
