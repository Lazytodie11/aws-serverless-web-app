import { useState } from 'react'
import './App.css'

const API_BASE = 'https://s2y97oaed2.execute-api.us-east-2.amazonaws.com/prod/search'

function App() {
  const [query, setQuery] = useState('star')
  const [results, setResults] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setError('Please enter a keyword.')
      setResults([])
      setCount(0)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `${API_BASE}?q=${encodeURIComponent(trimmedQuery)}`
      )

      const data = await response.json()

      if (!response.ok) {
        const message =
          data?.error || data?.message || 'Search request failed.'
        throw new Error(message)
      }

      setResults(data.results || [])
      setCount(data.count || 0)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setResults([])
      setCount(0)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Serverless Movie Search</h1>
        <p className="subtitle">
          Search movies by title or plot using AWS Lambda + API Gateway +
          OpenSearch.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Try: star, love, war..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <div className="message error">{error}</div>}

        {!error && !loading && count > 0 && (
          <div className="message success">
            Found {count} result{count !== 1 ? 's' : ''}.
          </div>
        )}

        <div className="results">
          {results.map((movie) => (
            <div className="card" key={movie.id}>
              {movie.image_url && (
                <img
                  src={movie.image_url}
                  alt={movie.title}
                  className="poster"
                />
              )}

              <div className="card-content">
                <h2>{movie.title}</h2>

                <div className="meta">
                  <span>Year: {movie.year ?? 'N/A'}</span>
                  <span>Rating: {movie.rating ?? 'N/A'}</span>
                </div>

                {movie.genres?.length > 0 && (
                  <div className="genres">
                    {movie.genres.map((genre) => (
                      <span className="genre" key={genre}>
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                <p className="plot">{movie.plot || 'No plot available.'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App