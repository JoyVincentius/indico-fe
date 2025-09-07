// src/components/UserDeleteDialog.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const UserDeleteDialog = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ color: 'red' }}>🗑️ Konfirmasi Hapus</DialogTitle>
      <DialogContent>
        <p>Apakah Anda yakin ingin menghapus pengguna ini?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Batal</Button>
        <Button onClick={onDelete} color="error" variant="contained">Hapus</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDeleteDialog;
