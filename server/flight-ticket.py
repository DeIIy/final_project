from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app, supports_credentials=True)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/flight', methods=['POST'])
def handle_flight_request():
    try:
        
        data = request.get_json()

        
        print('Hava Yolu Bilgileri:')
        print('Hava Yolu Şirketi:', data.get('airline'))
        print('Kalkış Noktası:', data.get('departure'))
        print('Varış Noktası:', data.get('arrival'))
        print('Seyahat Sınıfı:', data.get('travelClass'))
        print('Tarih ve Saat:', data.get('datetime'))
        print('Varmak İstenilen Zaman:', data.get('desiredTime'))
        print('Uçakta Durma Süresi (Dakika):', data.get('layover'))

        
        journey_date = data.get('datetime')

        date, time = journey_date.split("T")

        journey_year, journey_month, journey_day = map(int, date.split('-'))

        
        arrival_time = data.get('desiredTime')
        arrival_hour, arrival_minute = map(int, arrival_time.split(':'))

        
        layover_duration = data.get('layover')
        duration_mins = int(layover_duration) if layover_duration else 0

        print(duration_mins)

        
        source = data.get('departure')
        destination = data.get('arrival')
        travel_class = data.get('travelClass')
        airline = data.get('airline')

        print(source)
        print(destination)
        print(travel_class)
        print(airline)
        print("53")

        
        map_values = {
            'Journey_day': journey_day,
            'Journey_month': journey_month,
            'Journey_year': journey_year,
            'Dep_Time_hour': int(time.split(':')[0]),
            'Dep_Time_minute': int(time.split(':')[1]),
            'Arrival_Time_hour': arrival_hour,
            'Arrival_Time_minute': arrival_minute,
            'Duration_mins': duration_mins,
            'Source_Delhi': False,
            'Source_Mumbai': False,
            'Source_Banglore': False,
            'Source_Kolkata': False,
            'Source_Hyderabad': False,
            'Source_Chennai': False,
            'Destination_Banglore': False,
            'Destination_Chennai': False,
            'Destination_Delhi': False,
            'Destination_Hyderabad': False,
            'Destination_Kolkata': False,
            'Destination_Mumbai': False,
            'Class': False if travel_class == 'Economy' else True,
            'Airline_Air_Asia': False,
            'Airline_Akasa_Air': False,
            'Airline_GO_FIRST': False,
            'Airline_GoAir': False,
            'Airline_IndiGo': False,
            'Airline_Jet_Airways': False,
            'Airline_Multiple_carriers': False,
            'Airline_SpiceJet': False,
            'Airline_Trujet': False,
            'Airline_Vistara': False
        }
        
        print("90")
        
        map_values[f'Source_{source}'] = True
        map_values[f'Destination_{destination}'] = True
        map_values[f'Airline_{airline.replace(" ", "_")}'] = True

        print("96")

        df = pd.DataFrame([map_values])

        print("100")


        model_path = r'c:\Users\ytetl\seyahat\AI_models\plane_price_model.pkl'
        #plane_price_model.pkl
        #plane_price_Europe.pkl

        print("107")

        model = joblib.load(model_path)

        print("111")


        Price = int(model.predict(df))

        Price = 0.39 * Price

        Price = round(Price, 2)

        print("116")
        print(Price)

        print("120")

        
        response_data = {
            'Uçak bileti fiyat tahmini': Price
        }

        formatted_response = f"{list(response_data.keys())[0]} -> {list(response_data.values())[0]}"

        return jsonify(formatted_response), 200
    except Exception as e:
        
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)