import React, { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Copy, Download, Trash2, Settings } from 'lucide-react'
import './App.css'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [text, setText] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState(0)
  const [speechRate, setSpeechRate] = useState(1)
  const [speechPitch, setSpeechPitch] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    // Khởi tạo Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = 'vi-VN'
      
      recognitionInstance.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }
        
        setText(prev => prev + finalTranscript)
      }
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
      
      recognitionInstance.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognitionInstance)
    }

    // Lấy danh sách giọng nói
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices()
      setVoices(availableVoices)
    }

    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const toggleListening = () => {
    if (!recognition) {
      alert('Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói!')
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  const speakText = () => {
    if (!text.trim()) {
      alert('Vui lòng nhập văn bản để đọc!')
      return
    }

    if (isPlaying) {
      speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voices[selectedVoice]
    utterance.rate = speechRate
    utterance.pitch = speechPitch
    
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)
    
    speechSynthesis.speak(utterance)
  }

  const copyToClipboard = () => {
    if (!text.trim()) {
      alert('Không có văn bản để sao chép!')
      return
    }
    
    navigator.clipboard.writeText(text).then(() => {
      alert('Đã sao chép văn bản!')
    }).catch(() => {
      alert('Không thể sao chép văn bản!')
    })
  }

  const downloadText = () => {
    if (!text.trim()) {
      alert('Không có văn bản để tải xuống!')
      return
    }
    
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'voice-text-pro.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearText = () => {
    setText('')
    textareaRef.current?.focus()
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-icon">🎤</span>
            Voice Text Pro
          </h1>
          <p className="subtitle">Chuyển đổi giọng nói thành văn bản và ngược lại</p>
        </header>

        <div className="main-content">
          <div className="text-section">
            <div className="text-header">
              <h2>Văn bản</h2>
              <div className="text-actions">
                <button 
                  className="action-btn"
                  onClick={copyToClipboard}
                  title="Sao chép"
                >
                  <Copy size={18} />
                </button>
                <button 
                  className="action-btn"
                  onClick={downloadText}
                  title="Tải xuống"
                >
                  <Download size={18} />
                </button>
                <button 
                  className="action-btn danger"
                  onClick={clearText}
                  title="Xóa tất cả"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  className="action-btn"
                  onClick={() => setShowSettings(!showSettings)}
                  title="Cài đặt"
                >
                  <Settings size={18} />
                </button>
              </div>
            </div>
            
            <textarea
              ref={textareaRef}
              className="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập văn bản hoặc nhấn nút mic để ghi âm..."
              rows={10}
            />
          </div>

          <div className="controls">
            <div className="control-group">
              <button 
                className={`control-btn mic-btn ${isListening ? 'active' : ''}`}
                onClick={toggleListening}
                title={isListening ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}
              >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                <span>{isListening ? 'Đang nghe...' : 'Ghi âm'}</span>
              </button>

              <button 
                className={`control-btn speak-btn ${isPlaying ? 'active' : ''}`}
                onClick={speakText}
                title={isPlaying ? 'Dừng đọc' : 'Đọc văn bản'}
              >
                {isPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
                <span>{isPlaying ? 'Đang đọc...' : 'Đọc văn bản'}</span>
              </button>
            </div>
          </div>

          {showSettings && (
            <div className="settings-panel">
              <h3>Cài đặt giọng đọc</h3>
              
              <div className="setting-group">
                <label>Giọng nói:</label>
                <select 
                  value={selectedVoice} 
                  onChange={(e) => setSelectedVoice(parseInt(e.target.value))}
                  className="setting-select"
                >
                  {voices.map((voice, index) => (
                    <option key={index} value={index}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div className="setting-group">
                <label>Tốc độ đọc: {speechRate.toFixed(1)}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="setting-slider"
                />
              </div>

              <div className="setting-group">
                <label>Cao độ: {speechPitch.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speechPitch}
                  onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                  className="setting-slider"
                />
              </div>
            </div>
          )}
        </div>

        <footer className="footer">
          <p>© 2025 Voice Text Pro - Công cụ chuyển đổi giọng nói và văn bản</p>
        </footer>
      </div>
    </div>
  )
}

export default App