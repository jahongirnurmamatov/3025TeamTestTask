import { all } from 'axios';
import {create}  from 'zustand';
import { axiosInstance } from '../middleware/axiosInstance.js';

const useUrlStore = create((set) => ({
        shortUrl: null,
        allUrls: [],
        isShortening: false,
        error: null,
        isLoading:false,

        setShortUrl: (shortUrl) => set({ shortUrl }),

        shortenUrl: async (url, alias, expiresIn) => {
           try {
            set({ isShortening: true });
            const res = await axiosInstance.post('/shortenUrl/shorten', { longUrl: url, alias, expiresIn });
            set({ shortUrl: res.data.shortUrl, isShortening: false });
           } catch (error) {
            console.log(error)
            set({ error: error.response.data.error,isShortening:false });
           }
    
        },
    }));

export default useUrlStore