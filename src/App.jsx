import React from 'react'
import Navbar from './components/navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/place-order/Place-order'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './components/login-popup/LoginPopup'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Verify from './pages/verify/Verify'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      <ToastContainer />
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <div className="middle-part">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />

        </Routes>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
