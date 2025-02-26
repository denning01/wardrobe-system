<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useWardrobeStore } from '@/stores/wardrobe';
import type { ClothingItem } from '@/types';

const wardrobeStore = useWardrobeStore();
const searchQuery = ref('');
const selectedCategory = ref('');

const categories = [
  'Tops',
  'Bottoms',
  'Dresses',
  'Outerwear',
  'Shoes',
  'Accessories'
];

const filteredItems = computed(() => {
  return wardrobeStore.items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

onMounted(() => {
  wardrobeStore.fetchItems();
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">My Wardrobe</h1>
      <button class="btn-primary">
        Add Item
      </button>
    </div>
    
    <div class="mb-8 flex gap-4">
      <div class="flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search items..."
          class="input-field"
        />
      </div>
      <div class="w-48">
        <select
          v-model="selectedCategory"
          class="input-field"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>
    
    <div v-if="wardrobeStore.loading" class="text-center py-8">
      Loading...
    </div>
    
    <div v-else-if="wardrobeStore.error" class="text-center py-8 text-red-500">
      {{ wardrobeStore.error }}
    </div>
    
    <div v-else-if="filteredItems.length === 0" class="text-center py-8 text-gray-500">
      No items found.
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="bg-white rounded-lg shadow-sm p-4"
      >
        <img
          v-if="item.image_url"
          :src="item.image_url"
          :alt="item.name"
          class="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 class="text-lg font-semibold text-gray-900">{{ item.name }}</h3>
        <p class="text-sm text-gray-500 mb-2">{{ item.category }}</p>
        <p class="text-sm text-gray-600">{{ item.description }}</p>
        <div class="mt-4 flex justify-end space-x-2">
          <button
            @click="() => {}"
            class="text-blue-600 hover:text-blue-500"
          >
            Edit
          </button>
          <button
            @click="() => wardrobeStore.deleteItem(item.id)"
            class="text-red-600 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>