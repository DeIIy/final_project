from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from scipy.spatial.distance import cdist

app = Flask(__name__)
CORS(app, supports_credentials=True)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

@app.route('/api/hotel', methods=['POST'])
def predict_hotel_price():
    try:
        data = request.get_json()

        print('Otel Bilgileri:')
        print('Otel Şehri:', data.get('city'))
        print('Değerlendirme:', data.get('rating'))
        print('Olumlu Yorum Sayısı:', data.get('positiveComments'))
        print('Otel Yıldızları:', data.get('hotelStars'))
        print('Derecelendirme:', data.get('hotelRating'))

        rating = float(data.get('rating'))
        reviews = int(data.get('positiveComments'))
        star_rating = int(data.get('hotelStars'))
        city = data.get('city')
        hotelRating = data.get('hotelRating')

        map_values = {
            'Rating': rating,
            'Reviews': reviews,
            'Star Rating': star_rating,
            'city_Banglore': False,
            'city_Chennai': False,
            'city_Delhi': False,
            'city_Hyderabad': False,
            'city_Kolkata': False,
            'city_Mumbai': False,
            'Rating Description_Average': False,
            'Rating Description_Excellent': False,
            'Rating Description_Good': False,
            'Rating Description_Poor': False,
            'Rating Description_Very Good': False,
        }

        map_values[f'city_{city}'] = True
        map_values[f'Rating Description_{hotelRating}'] = True

        df = pd.DataFrame([map_values])

        model_path = r'c:\Users\ytetl\seyahat\AI_models\hotel_price.pkl'

        model = joblib.load(model_path)

        Hotel_Price = int(model.predict(df))

        csv_file_path = r'c:\Users\ytetl\seyahat\dataset\en_sonun_sonu.csv'

        hotel_df = pd.read_csv(csv_file_path)

        updated_hotel_df = hotel_df[hotel_df[f'city_{city}']]
        

        X = updated_hotel_df[['Price']]  
        Y = [[Hotel_Price]]

        updated_hotel_df['distance'] = cdist(Y, X, metric='euclidean')[0]
        nearest_data = updated_hotel_df.loc[updated_hotel_df['distance'].idxmin()]

        Taxi_Price = nearest_data['taxi_Start'] + (nearest_data['taxi_Km'] / 1000) * nearest_data['Distance to Landmark']
        print(Taxi_Price)
        print(nearest_data['taxi_Km'])
        print(nearest_data['Distance to Landmark'])
        print(nearest_data['taxi_Start'])

        Taxi_Price = 0.39 * Taxi_Price
        Taxi_Price = round(Taxi_Price, 2)

        Hotel_Price = 0.39 * Hotel_Price
        Hotel_Price = round(Hotel_Price, 2)


        response_data = {
            'Otel fiyat tahmini': Hotel_Price,
            'Taksi Fiyat Tahmini': Taxi_Price
        }

        

        return jsonify(response_data), 200
    except Exception as e:
        
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)