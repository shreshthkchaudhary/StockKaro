import axios from 'axios'

const api = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: { token: import.meta.env.VITE_API_KEY }
})

export const getQuote = (symbol) => api.get('/quote', { params: { symbol } })
export const searchStocks = (q) => api.get('/search', { params: { q } })
export const getCompanyProfile = (symbol) => api.get('/stock/profile2', { params: { symbol } })
export const getStockCandles = (symbol, resolution, from, to) => api.get('/stock/candle', { params: { symbol, resolution, from, to } })
