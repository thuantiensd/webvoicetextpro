import React, { useState, useEffect } from 'react'
import { Search, Play, Star, Calendar, Clock, Eye, Menu, X, Home, Film, Tv, Heart, User } from 'lucide-react'
import './App.css'

// Mock data cho phim
const mockMovies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    originalTitle: "Avatar: The Way of Water",
    year: 2022,
    rating: 8.5,
    duration: "192 phút",
    views: "2.5M",
    poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    backdrop: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop",
    genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
    description: "Jake Sully sống cùng gia đình mới của mình trên hành tinh Pandora. Khi một mối đe dọa quen thuộc trở lại để hoàn thành những gì đã bắt đầu trước đây, Jake phải làm việc với Neytiri và quân đội của chủng tộc Na'vi để bảo vệ hành tinh của họ.",
    type: "movie",
    isHot: true,
    isNew: true
  },
  {
    id: 2,
    title: "Black Panther: Wakanda Forever",
    originalTitle: "Black Panther: Wakanda Forever",
    year: 2022,
    rating: 8.2,
    duration: "161 phút",
    views: "1.8M",
    poster: "https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    backdrop: "https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop",
    genre: ["Hành động", "Phiêu lưu", "Drama"],
    description: "Nữ hoàng Ramonda, Shuri, M'Baku, Okoye và Dora Milaje chiến đấu để bảo vệ quốc gia của họ khỏi các thế lực can thiệp sau cái chết của Vua T'Challa.",
    type: "movie",
    isHot: true
  },
  {
    id: 3,
    title: "Stranger Things 4",
    originalTitle: "Stranger Things",
    year: 2022,
    rating: 9.1,
    duration: "8 tập",
    views: "3.2M",
    poster: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    backdrop: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop",
    genre: ["Kinh dị", "Khoa học viễn tưởng", "Drama"],
    description: "Sáu tháng sau trận chiến tại Starcourt, những người còn lại đang đối phó với hậu quả và lần đầu tiên, họ bị tách ra.",
    type: "series",
    isHot: true,
    isNew: true
  },
  {
    id: 4,
    title: "Top Gun: Maverick",
    originalTitle: "Top Gun: Maverick",
    year: 2022,
    rating: 8.8,
    duration: "130 phút",
    views: "2.1M",
    poster: "https://images.pexels.com/photos/8111268/pexels-photo-8111268.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    backdrop: "https://images.pexels.com/photos/8111268/pexels-photo-8111268.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop",
    genre: ["Hành động", "Drama"],
    description: "Sau hơn ba mười năm phục vụ như một trong những phi công hàng đầu của Hải quân, Pete 'Maverick' Mitchell đang ở nơi anh thuộc về, thúc đẩy phong bì như một phi công thử nghiệm dũng cảm.",
    type: "movie",
    isHot: true
  },
  {
    id: 5,
    title: "The Batman",
    originalTitle: "The Batman",
    year: 2022,
    rating: 8.4,
    duration: "176 phút",
    views: "1.9M",
    poster: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    backdrop: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop",
    genre: ["Hành động", "Tội phạm", "Drama"],
    description: "Khi kẻ giết người hàng loạt Riddler bắt đầu giết chết các nhân vật chính trị quan trọng ở Gotham, Batman buộc phải điều tra những mối liên hệ bí ẩn của thành phố và đặt câu hỏi về sự tham gia của gia đình mình.",
    type: "movie"
  },
  {
    id: 6,
    title: "House of the Dragon",
    originalTitle: "House of the Dragon",
    year: 2022,
    rating: 8.9,
    duration: "10 tập",
    views: "2.8M",
    poster: "https://images.pexels.com/photos/8111445/pexels-photo-8111445.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    backdrop: "https://images.pexels.com/photos/8111445/pexels-photo-8111445.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop",
    genre: ["Fantasy", "Drama", "Hành động"],
    description: "Một prequel của Game of Thrones, lấy bối cảnh 200 năm trước các sự kiện trong loạt phim gốc và kể về sự sụp đổ của House Targaryen.",
    type: "series",
    isNew: true
  }
]

const genres = ["Tất cả", "Hành động", "Phiêu lưu", "Kinh dị", "Khoa học viễn tưởng", "Drama", "Tình cảm", "Hài", "Tài liệu"]
const countries = ["Tất cả", "Mỹ", "Hàn Quốc", "Nhật Bản", "Trung Quốc", "Thái Lan", "Việt Nam"]
const years = ["Tất cả", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('Tất cả')
  const [selectedCountry, setSelectedCountry] = useState('Tất cả')
  const [selectedYear, setSelectedYear] = useState('Tất cả')
  const [currentPage, setCurrentPage] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [featuredMovie, setFeaturedMovie] = useState(mockMovies[0])

  useEffect(() => {
    // Tự động thay đổi phim nổi bật
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockMovies.length)
      setFeaturedMovie(mockMovies[randomIndex])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.originalTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'Tất cả' || movie.genre.includes(selectedGenre)
    const matchesYear = selectedYear === 'Tất cả' || movie.year.toString() === selectedYear
    
    return matchesSearch && matchesGenre && matchesYear
  })

  const hotMovies = mockMovies.filter(movie => movie.isHot)
  const newMovies = mockMovies.filter(movie => movie.isNew)
  const moviesList = mockMovies.filter(movie => movie.type === 'movie')
  const seriesList = mockMovies.filter(movie => movie.type === 'series')

  const MovieCard = ({ movie, size = 'normal' }) => (
    <div 
      className={`movie-card ${size}`}
      onClick={() => setSelectedMovie(movie)}
    >
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="movie-overlay">
          <Play className="play-icon" size={size === 'large' ? 48 : 32} />
        </div>
        <div className="movie-badges">
          {movie.isHot && <span className="badge hot">HOT</span>}
          {movie.isNew && <span className="badge new">MỚI</span>}
        </div>
        <div className="movie-rating">
          <Star size={12} />
          <span>{movie.rating}</span>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{movie.year} • {movie.duration}</p>
        <div className="movie-stats">
          <span><Eye size={14} /> {movie.views}</span>
        </div>
      </div>
    </div>
  )

  const MovieModal = ({ movie, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <img src={movie.backdrop} alt={movie.title} className="modal-backdrop" />
          <div className="modal-info">
            <h1>{movie.title}</h1>
            <p className="original-title">{movie.originalTitle}</p>
            <div className="movie-meta">
              <span className="rating"><Star size={16} /> {movie.rating}</span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span><Eye size={16} /> {movie.views}</span>
            </div>
            <div className="genres">
              {movie.genre.map(g => (
                <span key={g} className="genre-tag">{g}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="video-player">
            <div className="video-placeholder">
              <Play size={64} />
              <p>Nhấn để phát</p>
            </div>
          </div>
          
          <div className="movie-description">
            <h3>Nội dung phim</h3>
            <p>{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch(currentPage) {
      case 'movies':
        return (
          <div className="content-section">
            <h2 className="section-title">Phim Lẻ</h2>
            <div className="movies-grid">
              {moviesList.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )
      
      case 'series':
        return (
          <div className="content-section">
            <h2 className="section-title">Phim Bộ</h2>
            <div className="movies-grid">
              {seriesList.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )
      
      default:
        return (
          <>
            {/* Hero Section */}
            <div className="hero-section">
              <div className="hero-backdrop">
                <img src={featuredMovie.backdrop} alt={featuredMovie.title} />
                <div className="hero-overlay"></div>
              </div>
              <div className="hero-content">
                <div className="hero-info">
                  <h1 className="hero-title">{featuredMovie.title}</h1>
                  <div className="hero-meta">
                    <span className="rating"><Star size={16} /> {featuredMovie.rating}</span>
                    <span>{featuredMovie.year}</span>
                    <span>{featuredMovie.duration}</span>
                  </div>
                  <p className="hero-description">{featuredMovie.description}</p>
                  <div className="hero-actions">
                    <button 
                      className="btn-primary"
                      onClick={() => setSelectedMovie(featuredMovie)}
                    >
                      <Play size={20} />
                      Xem ngay
                    </button>
                    <button className="btn-secondary">
                      <Heart size={20} />
                      Yêu thích
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hot Movies */}
            <div className="content-section">
              <h2 className="section-title">Phim Hot</h2>
              <div className="movies-grid">
                {hotMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>

            {/* New Movies */}
            <div className="content-section">
              <h2 className="section-title">Phim Mới</h2>
              <div className="movies-grid">
                {newMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>

            {/* All Movies */}
            <div className="content-section">
              <h2 className="section-title">Tất cả phim</h2>
              <div className="movies-grid">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Film size={32} />
              <span>DongPhim</span>
            </div>

            <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
              <a 
                href="#" 
                className={currentPage === 'home' ? 'active' : ''}
                onClick={() => {setCurrentPage('home'); setIsMobileMenuOpen(false)}}
              >
                <Home size={18} />
                Trang chủ
              </a>
              <a 
                href="#"
                className={currentPage === 'movies' ? 'active' : ''}
                onClick={() => {setCurrentPage('movies'); setIsMobileMenuOpen(false)}}
              >
                <Film size={18} />
                Phim lẻ
              </a>
              <a 
                href="#"
                className={currentPage === 'series' ? 'active' : ''}
                onClick={() => {setCurrentPage('series'); setIsMobileMenuOpen(false)}}
              >
                <Tv size={18} />
                Phim bộ
              </a>
            </nav>

            <div className="header-actions">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Tìm kiếm phim..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="user-btn">
                <User size={20} />
              </button>

              <button 
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="filters">
        <div className="container">
          <div className="filter-group">
            <select 
              value={selectedGenre} 
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            
            <select 
              value={selectedCountry} 
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <Film size={24} />
                <span>DongPhim</span>
              </div>
              <p>Website xem phim online miễn phí chất lượng cao</p>
            </div>
            
            <div className="footer-section">
              <h4>Thể loại</h4>
              <ul>
                <li><a href="#">Phim hành động</a></li>
                <li><a href="#">Phim tình cảm</a></li>
                <li><a href="#">Phim kinh dị</a></li>
                <li><a href="#">Phim hài</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Quốc gia</h4>
              <ul>
                <li><a href="#">Phim Mỹ</a></li>
                <li><a href="#">Phim Hàn Quốc</a></li>
                <li><a href="#">Phim Trung Quốc</a></li>
                <li><a href="#">Phim Việt Nam</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Liên hệ</h4>
              <p>Email: contact@dongphim.com</p>
              <p>Hotline: 1900-xxxx</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 DongPhim. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  )
}

export default App