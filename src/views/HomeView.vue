<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Welcome to Wardrobe Manager</h1>
    
    <div class="max-w-2xl mx-auto">
      <p class="text-lg text-gray-600 mb-8">
        Organize your wardrobe efficiently and keep track of all your clothing items in one place.
      </p>
      
      <div class="space-x-4">
        <router-link
          v-if="!authStore.isAuthenticated"
          to="/register"
          class="btn-primary"
        >
          Get Started
        </router-link>
        <router-link
          v-else
          to="/wardrobe"
          class="btn-primary"
        >
          View My Wardrobe
        </router-link>
      </div>
    </div>
  </div>
</template>