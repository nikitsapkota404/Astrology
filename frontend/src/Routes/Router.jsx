import React from 'react'
import Home from '../pages/Home' 
import Services from '../pages/Services'
import Login from '../pages/Login'
import Contact from '../pages/Contact'
import Signup from '../pages/signup'
import Jyotish from '../pages/Jyotish/Jyotish'
import JyotishDetails from '../pages/Jyotish/JyotishDetails'
import {Routes, Route} from 'react-router-dom'
import MyAccount from '../Dashboard/user_account/MyAccount'
import Dashboard from '../Dashboard/astrologer_account/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import CheckoutSuccess from '../pages/checkoutSuccess'
import AboutPage from '../components/About/Abouts'
import HoroscopeReading from '../components/ServiceFeatures/HoroscopeReading'
import Predictions from '../components/ServiceFeatures/Predictions'
import CompatibilityCheck from '../components/ServiceFeatures/CompatibilityCheck'
import Muhurat from '../components/ServiceFeatures/Muhurat'
import Namings from '../components/ServiceFeatures/Namings'
import KundaliMatching from '../components/ServiceFeatures/KundaliMatching'
import Donate from '../components/Footer/Donate'
const Routers =()=>{
    return <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path="/about" element={<AboutPage />} />
        <Route path='/astrologers' element={<Jyotish/>} />
        <Route path='/astrologers/:id' element={<JyotishDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/services' element={<Services/>} />
        <Route path="/horoscope" element={<HoroscopeReading />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/compatibility-check" element={<CompatibilityCheck />} />
        <Route path="/muhurat" element={<Muhurat />} />
        <Route path="/namings" element={<Namings />} />
        <Route path="/kundali-matching" element={<KundaliMatching />} />
        <Route path="/donate" element={<Donate />} />
        <Route path='/checkout-success' element={<CheckoutSuccess/>} />
        <Route path='/users/profile/me' element={ <ProtectedRoute allowedRoles={['client']}> <MyAccount/></ProtectedRoute>} />
        <Route path='/astrologers/profile/me' element={<ProtectedRoute allowedRoles={['astrologer']}> <Dashboard/></ProtectedRoute>} />

    </Routes>
}
export default Routers