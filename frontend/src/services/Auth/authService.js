// src/services/Auth/authService.js
// mock authentication service.

export const authService = {
    login: async (email, password) => {
      // Mocked login function
      if (email === 'test@example.com' && password === 'password123') {
        return { success: true, token: 'fake-jwt-token' };
      }
      return { success: false, message: 'Invalid credentials' };
    },
    recoverPassword: async (email) => {
      // Mocked password recovery function
      if (email === 'test@example.com') {
        return { success: true, message: 'Password recovery email sent' };
      }
      return { success: false, message: 'Email not found' };
    },
  };
  