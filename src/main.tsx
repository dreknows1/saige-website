import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0f', 
      color: 'white',
      padding: '40px',
      fontFamily: 'system-ui'
    }}>
      <h1 style={{ color: '#ff0080' }}>SAIGE WEBSITE</h1>
      <p>Site is loading correctly!</p>
      <p>Admin: <a href="#/admin" style={{ color: '#00ffff' }}>Go to Admin</a></p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
