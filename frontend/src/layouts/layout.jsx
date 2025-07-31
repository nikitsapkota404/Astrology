import React from 'react'
import Header from '../components/Header/header'
import Footer from '../components/Footer/footer'
import Routers from '../Routes/Router'
const Layout =()=>{
    return <>
    <Header/>
    <main>
        <Routers/>
    </main>
    <Footer/>
    </>
};
export default Layout;