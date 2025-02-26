import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  async function login(email: string, password: string) {
    // Mock successful login for any credentials
    user.value = {
      id: 1,
      name: email.split('@')[0], // Use part of email as name
      email: email
    };
    isAuthenticated.value = true;
    return true;
  }

  async function register(name: string, email: string, password: string) {
    // Mock successful registration for any credentials
    user.value = {
      id: 1,
      name: name,
      email: email
    };
    isAuthenticated.value = true;
    return true;
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };
});