import { useState, useEffect } from 'react'
import { searchStocks } from '../api/finnhub'
import { useWatchlist } from '../context/WatchlistContext'
import Spinner from '../components/Spinner'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const { addStock, stocks } = useWatchlist()

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      fetchResults(query)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  const fetchResults = async (q) => {
    try {
      setLoading(true)
      setError('')
      const res = await searchStocks(q)
      setResults(res.data.result || [])
    } catch (err) {
      setError('Failed to search. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Sort results
  const sorted = [...results].sort((a, b) =>
    sortOrder === 'asc'
      ? a.description.localeCompare(b.description)
      : b.description.localeCompare(a.description)
  )

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Search Stocks
      </h1>

      <input
        id="search-input"
        type="text"
        placeholder="Search by company name or symbol (e.g. Apple, AAPL)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
      />

      {results.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            id="sort-button"
            onClick={toggleSort}
            className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Sort {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
          </button>
        </div>
      )}

      {loading && <Spinner />}

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="mt-4 flex flex-col gap-3">
        {sorted.map((item) => {
          const isAdded = stocks.some((s) => s.symbol === item.symbol)
          return (
            <div
              key={item.symbol}
              className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm px-5 py-4 hover:shadow-md transition-shadow"
            >
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{item.symbol}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
              <button
                onClick={() => addStock({ symbol: item.symbol, name: item.description })}
                disabled={isAdded}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isAdded
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                  }`}
              >
                {isAdded ? '✓ Added' : '+ Add'}
              </button>
            </div>
          )
        })}
      </div>

      {!loading && query && results.length === 0 && !error && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No results found for "{query}"
        </p>
      )}
    </div>
  )
}
