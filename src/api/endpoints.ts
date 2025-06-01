import type { FormData } from '../components/CreateForm/CreateForm';
import { apiClient } from './client';

export const getItems = async ({ pageParam = 1 }) => {
    const response = await fetch(`http://localhost:3000/items?_page=${pageParam}&_per_page=10`);
    if (!response.ok) throw new Error('Failed to fetch items');

    const json = await response.json();

    return {
        items: json.data,        
        nextPage: json.next    
    };
};

export const createItem = async (data: FormData) => {
    const response = await apiClient.post('/items', data);
    return response.data;
};