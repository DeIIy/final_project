import React, { useState, useEffect } from 'react';
import './flight-ticket.css';

const FlightTicket = () => {
  const [formData, setFormData] = useState({
    airline: '',
    departure: '',
    arrival: '',
    travelClass: '',
    datetime: '',
    desiredTime: '',
    layover: 0, 
  });

const [serverResponse, setServerResponse] = useState(null);
const [isFormReady, setIsFormReady] = useState(false);
const [error, setError] = useState(null); 


useEffect(() => {
    setIsFormReady(true);
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();

    
    const desiredTimeArray = formData.desiredTime.split(':').map(Number);
    const datetimeArray = formData.datetime.split('T')[1].split(':').map(Number);

    
    const layoverMinutes = (desiredTimeArray[0] * 60 + desiredTimeArray[1]) - (datetimeArray[0] * 60 + datetimeArray[1]);

    
    setFormData({ ...formData, layover: layoverMinutes });

    try {
        
        const data = {
            airline: formData.airline,
            departure: formData.departure,
            arrival: formData.arrival,
            travelClass: formData.travelClass,
            datetime: formData.datetime,
            desiredTime: formData.desiredTime,
            layover: layoverMinutes,
        };

        
        const response = await fetch('http://localhost:5000/api/flight', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            
            const responseData = await response.json();
            console.log('Sunucudan Gelen Yanıt:', responseData);

            
            setServerResponse(responseData);
        } else {
            console.error('Sunucu Hatası:', response.statusText);
        }
    } catch (error) {
        console.error('İstek Hatası:', error);
    }
};

const handleChange = (e) => {
    
    const { name, value } = e.target;

    
    if (name === 'departure' && value === formData.arrival) {
        
        setError('Kalkış ve Varış noktası aynı olamaz.');
        return;
    }

    if (name === 'arrival' && value === formData.departure) {
        
        setError('Kalkış ve Varış noktası aynı olamaz.');
        return;
    }

    
    if (name === 'desiredTime') {
        const desiredTimeMinutes = value.split(':').map(Number)[0] * 60 + value.split(':').map(Number)[1];
        const datetimeMinutes = formData.datetime.split('T')[1].split(':').map(Number)[0] * 60 + formData.datetime.split('T')[1].split(':').map(Number)[1];

        if (desiredTimeMinutes <= datetimeMinutes) {
            setError('Varmak istenen zaman, seyahat zamanından önce olamaz.');
            return;
        }
    }

    
    setError(null);
    setFormData({ ...formData, [name]: value });
};

return (
    <div>
        <h1>Seyahat Bütçe Tahmini Uygulaması</h1>
        {isFormReady ? (
            <div>
                <form id="travelForm" onSubmit={handleSubmit}>
                    <label htmlFor="airline">Hava Yolu Şirketi:</label>
                    <select id="airline" name="airline" onChange={handleChange} value={formData.airline}>
                        <option value="Trujet">Trujet</option>
                        <option value="SpiceJet">SpiceJet</option>
                        <option value="Air Asia">Air Asia</option>
                        <option value="IndiGo">IndiGo</option>
                        <option value="GoAir">GoAir</option>
                        <option value="Vistara">Vistara</option>
                        <option value="Multiple carriers">Multiple carriers</option>
                        <option value="Jet Airways">Jet Airways</option>
                        <option value="Akasa Air">Akasa Air</option>
                        <option value="GO FIRST">GO FIRST</option>
                    </select><br />

                    <label htmlFor="departure">Kalkış Noktası:</label>
                    <select id="departure" name="departure" onChange={handleChange} value={formData.departure}>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Banglore">Banglore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Chennai">Chennai</option>
                    </select><br />

                    <label htmlFor="arrival">Varış Noktası:</label>
                    <select id="arrival" name="arrival" onChange={handleChange} value={formData.arrival}>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Banglore">Banglore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Chennai">Chennai</option>
                    </select><br />

                    <label htmlFor="class">Seyahat Sınıfı:</label>
                    <select id="class" name="travelClass" onChange={handleChange} value={formData.travelClass}>
                        <option value="Business">Business</option>
                        <option value="Economy">Economy</option>
                    </select><br />

                    <label htmlFor="datetime">Tarih ve Saat:</label>
                    <input type="datetime-local" id="datetime" name="datetime" onChange={handleChange} value={formData.datetime} /><br />

                    <label htmlFor="desiredTime">Varmak İstenilen Zaman:</label>
                    <input type="time" id="desiredTime" name="desiredTime" onChange={handleChange} value={formData.desiredTime} /><br />

                    <label htmlFor="layover">Uçakta Durma Süresi (Dakika):</label>
                    <input type="text" id="layover" name="layover" onChange={handleChange} value={formData.layover} readOnly /><br />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <input type="submit" value="Uçak Bilet Fiyat Tahmini Yap" />
                </form>
            </div>
        ) : (
            <p>Form hazırlanıyor...</p>
        )}

        {serverResponse && (
            <div className="server-response">
                <h2>Uçak Bileti Fiyat Tahmini:</h2>
                <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
            </div>
        )}
    </div>
);
};

export default FlightTicket;
