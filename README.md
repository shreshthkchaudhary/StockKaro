# StockKaro 📈

StockKaro is a modern, single-page React stock market application that provides real-time stock data, dynamic search, and a persistent watchlist. Built with a responsive and sleek UI, the app gives users an intuitive platform to track the market.

## ✨ Features

- **Real-Time Data**: Live stock market data fetched seamlessly using the [Finnhub API](https://finnhub.io/).
- **Smart Search**: Quickly find your favorite stocks and view their details.
- **Persistent Watchlist**: Add stocks to your personal watchlist. Your data is saved locally using LocalStorage, so it's always there when you return.
- **Dark Mode Support**: A polished, responsive UI built with Tailwind CSS that includes a seamless dark mode experience.
- **Smooth Navigation**: Fast, client-side routing using React Router DOM.
- **API Rate Limit Handling**: Built-in mechanisms to gracefully handle API tier restrictions and ensure a stable user experience.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) (v19) via [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **State Management**: React Context API
- **Local Storage**: Browser `localStorage` for watchlist persistence

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd StockKaro
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory of the project and add your Finnhub API key. Make sure you don't commit this file to public repositories!
   ```env
   VITE_FINNHUB_API_KEY=your_finnhub_api_key_here
   ```
   *You can get a free API key by signing up at [Finnhub](https://finnhub.io/).*

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Visit `http://localhost:5173` in your browser.

## 📦 Build for Production

To create a production-ready build, run:
```bash
npm run build
```
You can then preview the build locally using:
```bash
npm run preview
```

## 🔒 Security Note

The `.env` file containing the API keys is included in `.gitignore` to prevent sensitive credentials from being exposed in public version control. **Never commit your `.env` file to GitHub.**

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
