import { useWatchlist } from '../context/WatchlistContext'

export default function Watchlist() {
  const { stocks, removeStock } = useWatchlist()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
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
        <div className="flex flex-col gap-3">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm px-5 py-4 hover:shadow-md transition-shadow"
            >
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{stock.symbol}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
              </div>
              <button
                onClick={() => removeStock(stock.symbol)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
