import { useState, useEffect } from 'react'
import { useWatchlist } from '../context/WatchlistContext'
import { getQuote } from '../api/finnhub'
import StockCard from '../components/StockCard'
import Spinner from '../components/Spinner'

export default function Watchlist() {
  const { stocks } = useWatchlist()
  const [stockData, setStockData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (stocks.length === 0) {
      setStockData([])
      return
    }

    const fetchQuotes = async (isInitial = false) => {
      try {
        if (isInitial) setLoading(true)
        setError('')
        const results = await Promise.all(
          stocks.map(async (stock) => {
            try {
              const res = await getQuote(stock.symbol)
              return {
                symbol: stock.symbol,
                name: stock.name,
                price: res.data.c || 0,
                change: res.data.d || 0,
                changePercent: res.data.dp || 0,
              }
            } catch (err) {
              console.error(`Failed to fetch quote for ${stock.symbol}:`, err)
              return {
                symbol: stock.symbol,
                name: stock.name,
                price: 0,
                change: 0,
                changePercent: 0,
              }
            }
          })
        )
        setStockData(results)
      } catch (err) {
        setError('Failed to load live data for watchlist.')
      } finally {
        if (isInitial) setLoading(false)
      }
    }

    fetchQuotes(true)

    const intervalId = setInterval(() => {
      fetchQuotes(false)
    }, 30000)

    return () => clearInterval(intervalId)
  }, [stocks])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Watchlist
      </h1>

      {stocks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No stocks saved yet.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Search for stocks and add them to your watchlist.
          </p>
        </div>
      ) : (
        <>
          {loading && <Spinner />}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stockData.map((stock) => (
                <StockCard
                  key={stock.symbol}
                  symbol={stock.symbol}
                  name={stock.name}
                  price={stock.price}
                  change={stock.change}
                  changePercent={stock.changePercent}
                  isWatchlistView={true}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

