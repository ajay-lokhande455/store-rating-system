import React from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import StorePage from './pages/StorePage'
import RatingPage from './pages/RatingPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <div >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stores" element={<StorePage />} />  
          <Route path="/rating" element={<RatingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
