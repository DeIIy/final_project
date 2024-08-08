import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from './redux/actions';
import FlightTicket from './pages/flight-ticket';
import HotelAndTaxi from './pages/hotel-and-taxi';
import './App.css';

const App = () => {
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState('flight-ticket');

  const handleButtonClick = (page) => {
    dispatch(setPage(page));
    setSelectedButton(page);
  };

  return (
    <div className="app-container">
      <div className="button-container">
        <button
          className={`page-button ${selectedButton === 'flight-ticket' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('flight-ticket')}
        >
          Uçak Bileti Fiyat Tahmini
        </button>
        <button
          className={`page-button ${selectedButton === 'hotel-and-taxi' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('hotel-and-taxi')}
        >
          Otel ve Taksi Fiyat Tahmini
        </button>
      </div>
      <div className="page-container">
        {currentPage === 'flight-ticket' && <FlightTicket />}
        {currentPage === 'hotel-and-taxi' && <HotelAndTaxi />}
      </div>
    </div>
  );
};

export default App;
