import {create}  from 'zustand';
import { axiosInstance } from '../middleware/axiosInstance.js';

const useUrlStore = create((set,get) => ({
        shortUrl: null,
        error: null,
        isLoading:false,

        setShortUrl: (shortUrl) => set({ shortUrl }),


        shortenUrl: async (url, alias, expiresIn) => {
           try {
            set({ isLoading: true });
            const res = await axiosInstance.post('/shortenUrl/shorten', { longUrl: url, alias, expiresIn });
            console.log(res.data)
            set({ shortUrl: res.data.shortUrl, isLoading: false });
           } catch (error) {
            console.log(error)
            set({ error: error.response.data.error,isLoading:false });
           }
    
        },
}));

export default useUrlStore