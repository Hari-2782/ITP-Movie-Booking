import React, { useEffect, useState } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// import Schedule from "./page/schedule/scedule";

import Splash from './component/SplashScreen'; // Import the Splash component
import AddCelebToMovie from './page/movie/addceleberity.jsx';
import CreateMoviePage from "./page/movie/movie.jsx";
import ScreenCrud from "./page/seat/seat";
import AddFoodItem from './page/food/food.jsx';
import PackageManagement from './page/offer/offer.jsx';
import Payments from './page/paymeent/payment.jsx';
import AdminDashboard from './admin.js';



function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light' // Use localStorage or default
  );

  useEffect(() => {
    localStorage.setItem('theme', theme); // Update localStorage
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <Splash theme={theme} setTheme={toggleTheme}  /> 
        
        {/* <CreateMoviePage theme={theme} />
        <AddFoodItem/>
        <ScreenCrud  />
        <Schedule />
        <AddCelebToMovie/>
        <PackageManagement/>
      <Payments/>*/}
     <AdminDashboard/> 
      </header>
    </div>
  );
}

export default App;
