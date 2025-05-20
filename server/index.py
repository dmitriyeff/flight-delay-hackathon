from flask import Flask, request, jsonify
import lightgbm as lgb
import pandas as pd
import os

app = Flask(__name__)

# Load the trained LightGBM model
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../flight_delay_lgbm.txt')
model = lgb.Booster(model_file=MODEL_PATH)

# Dummy median and mode values for features (should match training data)
# In production, load these from a file or compute from training data
MEDIAN_VALUES = {
    'Month': 6,
    'DayofMonth': 15,
    'DepDelay': 0
}
MODE_CARRIER = 0  # Most frequent carrier code from training data

# Example columns order (should match training data)
COLUMNS = ['Month', 'DayofMonth', 'Carrier', 'OriginAirportID', 'DestAirportID', 'DepDelay', 'DayOfWeek']

@app.route('/predict', methods=['GET'])
def predict_delay():
    try:
        # Get parameters
        day_of_week = request.args.get('dayOfTheWeek', type=int)
        origin_airport_id = request.args.get('originAirportId', type=int)
        destination_airport_id = request.args.get('destinationAirportId', type=int)

        # Validate parameters
        if day_of_week is None or origin_airport_id is None or destination_airport_id is None:
            return jsonify({'probability': None, 'message': 'Missing required parameters'}), 400
        if not (0 <= day_of_week <= 6):
            return jsonify({'probability': None, 'message': 'day_of_week must be between 0 and 6'}), 400

        # Prepare input sample
        sample = {
            'Month': MEDIAN_VALUES['Month'],
            'DayofMonth': MEDIAN_VALUES['DayofMonth'],
            'Carrier': MODE_CARRIER,
            'OriginAirportID': int(origin_airport_id),
            'DestAirportID': int(destination_airport_id),
            'DepDelay': MEDIAN_VALUES['DepDelay']
        }
        # Add DayOfWeek if the model expects it
        if 'DayOfWeek' in COLUMNS:
            sample['DayOfWeek'] = day_of_week

        sample_df = pd.DataFrame([sample], columns=COLUMNS)
        proba = model.predict(sample_df)[0]
        return jsonify({'probability': float(proba), 'message': 'Success'}), 200
    except Exception as e:
        return jsonify({'probability': None, 'message': f'Error: {str(e)}'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
