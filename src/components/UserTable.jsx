// src/components/UserTable.jsx
import React from 'react';
import { useUserQuery } from '../hooks/useUserQuery';
import { useDeleteUser } from '../hooks/useUserQuery';
import UserDeleteDialog from './UserDeleteDialog';

const UserTable = () => {
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState(null);

  const { data, isLoading } = useUserQuery(page, 5, searchQuery);

  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = () => {
    if (!userToDelete) return;
    deleteUser(userToDelete.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
      },
      onError: () => {
        alert('Gagal menghapus pengguna');
        setDeleteDialogOpen(false);
      }
    });
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return <p style={{ textAlign: 'center', color: '#666' }}>Memuat data...</p>;
  }

  const totalPages = Math.ceil((data?.total || 0) / 5);

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#0057b8', color: 'white' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Nama</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Peran</th>
            <th style={{ padding: '0.75rem', textAlign: 'center' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: '#666' }}>
                🙃 Tidak ada pengguna ditemukan
              </td>
            </tr>
          ) : (
            data?.data.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.75rem' }}>{user.name}</td>
                <td style={{ padding: '0.75rem' }}>{user.email}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ 
                    backgroundColor: user.role === 'Admin' ? '#f44336' : 
                                    user.role === 'Editor' ? '#ff9800' : '#4caf50',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    style={{
                      padding: '0.3rem 0.6rem',
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '0.5rem' }}>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            style={{
              padding: '0.4rem 0.8rem',
              border: '1px solid #ccc',
              background: page === 1 ? '#eee' : '#fff',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            Sebelumnya
          </button>

          <span style={{ lineHeight: '2.5', color: '#333' }}>
            Halaman {page} dari {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            style={{
              padding: '0.4rem 0.8rem',
              border: '1px solid #ccc',
              background: page >= totalPages ? '#eee' : '#fff',
              cursor: page >= totalPages ? 'not-allowed' : 'pointer',
            }}
          >
            Berikutnya
          </button>
        </div>
      )}

      {/* Dialog Konfirmasi */}
      <UserDeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserTable;
