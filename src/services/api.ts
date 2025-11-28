//Centralisation des communications avec l'API

import axios from 'axios'
import type { Artist } from '../types/Artist'

const API_URL = import.meta.env.VITE_API_URL

// Configuration d'axios avec baseURL
const axiosInstance = axios.create({
    baseURL: API_URL
})

// Intercepteur pour ajouter automatiquement le token à chaque requête (genre de middleware)
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

//Lie toutes les routes liées aux artists 
export const artistApi = {
    getAll: async (): Promise<Artist[]> => {
        const response = await axiosInstance.get('artists')
        return response.data
    },

    getPublic: async (): Promise<Artist[]> => {
        const response = await axiosInstance.get('artists/public')
        return response.data
    },

    getOne: async (id: string): Promise<Artist> => {
        const response = await axiosInstance.get(`artists/${id}`)
        return response.data
    },
    //PARTIAL permet de ne pas avoir a remplir tous les champs
    create: async (artist: Partial<Artist>): Promise<Artist> => {
        const response = await axiosInstance.post('artists/new', artist)
        return response.data
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`artists/${id}`)
    },

    //Envoyer le form avec l'upload de la photo ensemble
    submitForm: async (formData: FormData): Promise<Artist> => {
        const response = await axiosInstance.post('artists/form', formData)
        return response.data
    },

    updateWithFile: async (id: string, formData: FormData): Promise<Artist> => {
    const response = await axiosInstance.patch(`artists/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data;
    }
}

export const adminApi = {
    login: async (email: string, password: string): Promise<string> => {
        const response = await axiosInstance.post('admin/login', { email, password })
        return response.data.token
    }
}

export const emailApi = {
    send: async (data: { name?: string; email?: string; object?: string; message?: string; isAgree?: boolean }): Promise<void> => {
        await axiosInstance.post('email/send', data)
    }
}