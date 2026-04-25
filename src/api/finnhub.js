import axios from 'axios'

const api = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: { token: import.meta.env.VITE_API_KEY }
})

export const getQuote = (symbol) => api.get('/quote', { params: { symbol } })
export const searchStocks = (q) => api.get('/search', { params: { q } })
