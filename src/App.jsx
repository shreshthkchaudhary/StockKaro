import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Spinner from './components/Spinner'

const Home = lazy(() => import('./pages/Home'))
const Search = lazy(() => import('./pages/Search'))
const Watchlist = lazy(() => import('./pages/Watchlist'))
const StockDetails = lazy(() => import('./pages/StockDetails'))

export default function App() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/stock/:symbol" element={<StockDetails />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
