import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Auth from './auth'; // Update import to use PascalCase for component name
import MoviePage from './component/movie/getmovie';
import BuyTicketsPage from './component/movie/movieschedule';
import SelectSeatPage from './component/movie/screenlayut';
import Login from './component/user/login';
import Signup from './component/user/register';
import Footer from './component/utils/footer/footer';
import HomeSlider from './component/utils/home';
import MovieCarousel from './component/utils/moviecard/movieCarousel';
import MovieCard from './component/utils/moviecard/moviecard';
import Navbar from './component/utils/navbar/navbar';
import FoodList from './component/book/food';
import PaymentPage from './component/book/payment';
import OfferPage from './component/book/offer';

function App() {
    return (
        
        <Router>
        
           <Navbar />
            <Routes>
           
                <Route path="/" element={<HomeSlider />} />
                <Route path="/movie" element={<MovieCarousel />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/movies/:movieId" element={<MoviePage />} />
                <Route path="/movies/:movieId/card" element={<MovieCard />} />
                <Route path="/buy-ticket/:movieid" element={<BuyTicketsPage />} />
                <Route path="/seat-layout/:movieid/:screenid/:date" element={<SelectSeatPage />} />
                <Route path="/food/:bookingId" element={<FoodList />} />
                <Route path="/payment/:offerId" element={<PaymentPage/>} />
                <Route path="/payment/:bookingId/:foodId?" element={<PaymentPage/>} />
                <Route path="/payment/:offerId" element={<PaymentPage/>} />
                <Route path="/offer" element={<OfferPage/>} />

                {/* Add more routes as needed */}
            </Routes>
            <footer>
            <Footer />
            </footer>
        </Router>
    );
}

export default App;
