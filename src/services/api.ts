//Centralisation des communications avec l'API

import axios from 'axios'
import type { Artist } from '../types/Artist'

const API_URL = import.meta.env.VITE_API_URL

// Configuration d'axios avec baseURL
const axiosInstance = axios.create({
    baseURL: API_URL
})

// Intercepteur pour ajouter automatiquement le token à chaque requête
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const artistApi = {
    getAll: async (): Promise<Artist[]> => {
        const response = await axiosInstance.get('artists')
        return response.data
    },

    getOne: async (id: string): Promise<Artist> => {
        const response = await axiosInstance.get(`artists/${id}`)
        return response.data
    },
    //PARTIAL permet de ne pas avoir a remplir tous les champs
    create: async (artist: Partial<Artist>): Promise<Artist> => {
        const response = await axiosInstance.post('artists', artist)
        return response.data
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`artists/${id}`)
    },

    submitForm: async (formData: FormData): Promise<Artist> => {
        const response = await axiosInstance.post('artists/form', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    },

    updateWithFile: async (id: string, formData: FormData): Promise<Artist> => {
        const response = await axiosInstance.patch(`artists/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    }
}

export const adminApi = {
    login: async (email: string, password: string): Promise<string> => {
        const response = await axiosInstance.post('admin/login', { email, password })
        return response.data.token
    }
}