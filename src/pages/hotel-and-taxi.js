import React, { useState, useEffect } from 'react';
import './flight-ticket.css';

const HotelAndTaxi = () => {
  const [formData, setFormData] = useState({
    city: '',
    rating: 0,
    positiveComments: 0,
    hotelStars: '',
    hotelRating: '',
});

const [serverResponse, setServerResponse] = useState(null);
const [isFormReady, setIsFormReady] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
    setIsFormReady(true);
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // yapılacak_1
        const data = {
            city: formData.city,
            rating: formData.rating,
            positiveComments: formData.positiveComments,
            hotelStars: formData.hotelStars,
            hotelRating: formData.hotelRating,
        };

        const response = await fetch('http://localhost:5001/api/hotel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Sunucudan gelen yanıtı kontrol et
            const responseData = await response.json();
            console.log('Sunucudan Gelen Yanıt:', responseData);

            // Sunucu yanıtını state'e kaydet
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
    setFormData({ ...formData, [name]: value });
};

return (
    <div>
    <h1>Seyahat Bütçe Tahmini Uygulaması</h1>
    {isFormReady ? (
        <div>
            <form id="hotelForm" onSubmit={handleSubmit}>
            <label htmlFor="city">Otel Şehri:</label>
                    <select id="city" name="city" onChange={handleChange} value={formData.city}>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Banglore">Banglore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Chennai">Chennai</option>
                    </select><br />


                <label htmlFor="rating">Değerlendirme (1 ile 5 arası):</label>
                <input type="number" id="rating" name="rating" min="1" max="5" step="0.1" value={formData.rating} onChange={handleChange}/><br />

                <label htmlFor="positiveComments">Olumlu Yorum Sayısı:</label>
                <input type="number" id="positiveComments" name="positiveComments" value={formData.positiveComments} onChange={handleChange}/><br />

                <label htmlFor="hotelStars">Otel Yıldızları:</label>
                <select id="hotelStars" name="hotelStars" onChange={handleChange} value={formData.hotelStars}>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                </select>

                <label htmlFor="hotelRating">Derecelendirme:</label>
                <select id="hotelRating" name="hotelRating" onChange={handleChange} value={formData.hotelRating}>
                    <option value="Average">Average</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Poor">Poor</option>
                    <option value="VeryGood">Very Good</option>
                </select><br />

                <input type="submit" value="Otel ve Taksi Fiyat Tahmini Yap" />
            </form>
            </div>
        ) : (
            <p>Form hazırlanıyor...</p>
        )}
            {serverResponse && (
            <div className="server-response">
                <h2>Sunucu Yanıtı:</h2>
                <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
            </div>
        )}
    </div>
);
};

export default HotelAndTaxi;
