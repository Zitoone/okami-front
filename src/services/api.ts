//Centralisation des communications avec l'API

import axios from 'axios'
import type { Artist } from '../types/Artist'

const API_URL = import.meta.env.VITE_API_URL

export const artistApi = {
    getAll: async (): Promise<Artist[]> => {
        const response = await axios.get(API_URL)
        return response.data
    },

    getOne: async (id: string): Promise<Artist> => {
        const response = await axios.get(`${API_URL}/${id}`)
        return response.data
    },

    create: async (artist: Partial<Artist>): Promise<Artist> => {
        const response = await axios.post(API_URL, artist)
        return response.data
    },

    update: async (id: string, artist: Partial<Artist>): Promise<Artist> => {
        const response = await axios.put(`${API_URL}/${id}`, artist)
        return response.data
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`)
    }
}