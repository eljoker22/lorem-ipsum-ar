import React, {useState, useEffect}  from 'react'
import LoremIpsum from '../../component/lorem/LoremIpsum'
import ImgLorem from '../../component/placeholder/ImgLorem'
import {ButtonRoute} from '../../component/button/Button'
import classes from './home.module.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Footer from '../../component/footer/Footer';

function Home() {
    const location = window.location.href.split('/');
    const styleOut = {color: 'var(--primary-color)', border: '1px solid var(--primary-color)', padding: '4px 25px'};
    const styleCont = {background: 'var(--primary-color'}
    const [currentPage, setCurrentPage] = useState(location.includes('images') ? 'images' : 'home');

    return(
        <>
        <div className={classes.homeContainer}>
            <img src="/images/logo.png" alt="logo" />
            <h1 style={{margin: '15px 0'}}>توليد مقالات عربية</h1>

            <BrowserRouter>
                <div className={classes.btnCont}>
                    <Link to="/">
                        <ButtonRoute variant={currentPage === 'home' ? 'contained' : 'outlined'} style={currentPage === 'home' ? styleCont : styleOut} onClick={() => setCurrentPage('home')}>مولد النصوص</ButtonRoute>
                    </Link>
                    <Link to="/images">
                        <ButtonRoute variant={currentPage === 'images' ? 'contained' : 'outlined'} style={currentPage === 'images' ? styleCont : styleOut} onClick={() => setCurrentPage('images')}>مولد الصور</ButtonRoute>
                    </Link>                    
                </div>

                <Routes>
                    <Route path="/" exact element={<LoremIpsum />} />
                    <Route path="/images" element={<ImgLorem />} />
                </Routes>
            </BrowserRouter>
        </div>
        <Footer />
        </>
    )
}
export default Home;