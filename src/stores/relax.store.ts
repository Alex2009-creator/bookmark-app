import type { CardProps } from '@/interfaces/cardprops.interface';
import { defineStore } from 'pinia';

export const useRelaxStore = defineStore('relax', {
    // Состояние (state)
    state: () => ({
        items: [] as CardProps[],
        status: 'idle' as 'idle' | 'loading' | 'success' | 'error',
    }),

    // Действия (actions)
    actions: {
        async fetchMeditations() {
            this.status = 'loading';
            try {      
                const response = await fetch('http://localhost:3000/api/meditations');
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
