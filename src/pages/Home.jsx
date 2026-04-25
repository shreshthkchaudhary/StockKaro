import { useState, useEffect } from 'react'
import { getQuote } from '../api/finnhub'
import StockCard from '../components/StockCard'
import Spinner from '../components/Spinner'

const STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.' },
]

export default function Home() {
  const [stockData, setStockData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true)
        setError('')
        const results = await Promise.all(
          STOCKS.map(async (stock) => {
            const res = await getQuote(stock.symbol)
            return {
              symbol: stock.symbol,
              name: stock.name,
              price: res.data.c,
              change: res.data.d,
              changePercent: res.data.dp,
            }
          })
        )
        setStockData(results)
      } catch (err) {
        setError('Failed to load stock data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchQuotes()
  }, [])

  if (loading) return <Spinner />

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Market Overview
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Live prices of popular stocks
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stockData.map((stock) => (
          <StockCard
            key={stock.symbol}
            symbol={stock.symbol}
            name={stock.name}
            price={stock.price}
            change={stock.change}
            changePercent={stock.changePercent}
          />
        ))}
      </div>
    </div>
  )
}
