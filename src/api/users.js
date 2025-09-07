// src/api/users.js
// Simulasi API backend (bisa diganti dengan real API)

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Editor' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'User' },
  { id: 5, name: 'Emma Brown', email: 'emma@example.com', role: 'Admin' },
];

export const fetchUsers = async (page = 1, limit = 5, query = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = filtered.slice(start, end);
      const total = filtered.length;

      resolve({
        data: paginated,
        total,
        page,
        limit,
      });
    }, 500);
  });
};

export const createUser = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: mockUsers.length + 1,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };
      mockUsers.push(newUser);
      resolve(newUser);
    }, 600);
  });
};

export const deleteUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex(user => user.id === id);
      if (index > -1) {
        mockUsers.splice(index, 1);
        resolve({ success: true });
      } else {
        resolve({ success: false });
      }
    }, 500);
  });
};
