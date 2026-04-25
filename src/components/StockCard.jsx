import { useWatchlist } from '../context/WatchlistContext'

export default function StockCard({ symbol, name, price, change, changePercent, isWatchlistView }) {
  const { addStock, removeStock, stocks } = useWatchlist()
  const isPositive = change >= 0
  const isAdded = stocks.some((s) => s.symbol === symbol)

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900 dark:text-white">{symbol}</span>
        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
          isPositive
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
        }`}>
          {isPositive ? '▲' : '▼'} {changePercent?.toFixed(2)}%
        </span>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">{name}</p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          ${price?.toFixed(2)}
        </span>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{change?.toFixed(2)}
        </span>
      </div>

      {isWatchlistView ? (
        <button
          onClick={() => removeStock(symbol)}
          className="w-full py-2 rounded-lg font-medium transition-colors bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 cursor-pointer"
        >
          Remove from Watchlist
        </button>
      ) : (
        <button
          onClick={() => addStock({ symbol, name })}
          disabled={isAdded}
          className={`w-full py-2 rounded-lg font-medium transition-colors ${
            isAdded
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
          }`}
        >
          {isAdded ? '✓ In Watchlist' : '+ Add to Watchlist'}
        </button>
      )}
    </div>
  )
}
