import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ClothingItem } from '@/types';
import axios from 'axios';

export const useWardrobeStore = defineStore('wardrobe', () => {
  const items = ref<ClothingItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchItems() {
    loading.value = true;
    try {
      const response = await axios.get('/api/clothing-items');
      items.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch items';
    } finally {
      loading.value = false;
    }
  }

  async function addItem(item: Omit<ClothingItem, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const response = await axios.post('/api/clothing-items', item);
      items.value.push(response.data);
      return true;
    } catch (err) {
      error.value = 'Failed to add item';
      return false;
    }
  }

  async function updateItem(id: number, item: Partial<ClothingItem>) {
    try {
      const response = await axios.put(`/api/clothing-items/${id}`, item);
      const index = items.value.findIndex(i => i.id === id);
      if (index !== -1) {
        items.value[index] = response.data;
      }
      return true;
    } catch (err) {
      error.value = 'Failed to update item';
      return false;
    }
  }

  async function deleteItem(id: number) {
    try {
      await axios.delete(`/api/clothing-items/${id}`);
      items.value = items.value.filter(item => item.id !== id);
      return true;
    } catch (err) {
      error.value = 'Failed to delete item';
      return false;
    }
  }

  return {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    updateItem,
    deleteItem
  };
});