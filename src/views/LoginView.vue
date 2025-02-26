<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  error.value = '';
  const success = await authStore.login(email.value, password.value);
  
  if (success) {
    router.push('/wardrobe');
  } else {
    error.value = 'Invalid email or password';
  }
};
</script>

<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8">Login</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div v-if="error" class="bg-red-50 text-red-500 p-3 rounded-md text-sm">
        {{ error }}
      </div>
      
      <div>
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="input-field"
        />
      </div>
      
      <div>
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="input-field"
        />
      </div>
      
      <button type="submit" class="w-full btn-primary">
        Login
      </button>
      
      <p class="text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 hover:text-blue-500">
          Register
        </router-link>
      </p>
    </form>
  </div>
</template>