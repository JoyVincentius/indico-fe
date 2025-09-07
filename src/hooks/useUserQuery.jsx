// src/hooks/useUserQuery.jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser, deleteUser } from '../api/users';

// Use this query for fetching users with pagination and search
export const useUserQuery = (page = 1, limit = 5, searchQuery = '') => {
  return useQuery({
    queryKey: ['users', page, limit, searchQuery],
    queryFn: () => fetchUsers(page, limit, searchQuery),
    staleTime: 10000,
  });
};

// Mutation untuk menambah pengguna
export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData) => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Mutation untuk menghapus pengguna
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
