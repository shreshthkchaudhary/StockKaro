import { createContext, useContext, useState, useEffect } from 'react'

const WatchlistContext = createContext()

export function WatchlistProvider({ children }) {
  const [stocks, setStocks] = useState(
    JSON.parse(localStorage.getItem('watchlist') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(stocks))
  }, [stocks])

  const addStock = (stock) => {
    setStocks((prev) => {
      // Prevent duplicates
      if (prev.find((s) => s.symbol === stock.symbol)) return prev
      return [...prev, stock]
    })
  }

  const removeStock = (symbol) => {
    setStocks((prev) => prev.filter((s) => s.symbol !== symbol))
  }

  return (
    <WatchlistContext.Provider value={{ stocks, addStock, removeStock }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = () => useContext(WatchlistContext)
