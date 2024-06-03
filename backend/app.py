from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from core.services import SentimentAnalysisService
from infrastructure.json_storage import JSONStorage
from infrastructure.data_access import DataAccess
from infrastructure.user_storage import UserStorage


app = Flask(__name__)
CORS(app)

# Configuración
history_file_path = 'data/history_tweets.json'
data_file_path = 'data/datos_tweets.csv'
user_file_path = 'data/user.json'

# Inicializar componentes
data_access = DataAccess(data_file_path)
json_storage = JSONStorage(history_file_path)
service = SentimentAnalysisService(data_access, json_storage)
user_storage = UserStorage(user_file_path)


@app.route('/classify', methods=['POST'])
def classify():
    data = request.get_json()
    tweet = data['tweet']
    sentiment = service.classify_tweet(tweet)
    response = {'sentiment': sentiment}
    return jsonify(response)

@app.route('/history_tweets.json')
def send_json():
    return send_file(history_file_path)

@app.route('/data', methods=['GET'])
def get_data():
    data = service.get_data()
    return jsonify(data)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if user_storage.validate_user(username, password):
        return jsonify({'success': True})
    else:
        return jsonify({'success': False}), 401

if __name__ == '__main__':
    app.run(debug=True)
