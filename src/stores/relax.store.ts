import type { CardProps } from '@/interfaces/cardprops.interface';
import { defineStore } from 'pinia';
// Импортируем нашу обертку
import { protectedFetch } from '../utils/api'; 

export const useRelaxStore = defineStore('relax', {
    state: () => ({
        items: [] as CardProps[],
        status: 'idle' as 'idle' | 'loading' | 'success' | 'error',
    }),

    actions: {
        async fetchMeditations() {
            this.status = 'loading';
            try {      
                // Используем protectedFetch с относительным путем
                const response = await protectedFetch('/meditations');
                
                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }

                const result = await response.json();
                this.items = result.data.meditations;
                this.status = 'success';

            } catch (error) {
                console.error(error);
                this.status = 'error';
            }
        }
    }
});