from flask import Flask,jsonify
from flask_cors import CORS
from connectMongo import connectToDatabase
from getMusic import getPlaylists , getSongs
from emotionApi import query

app = Flask(__name__)
CORS(app)
db = connectToDatabase()

@app.route('/')
def home():
    payload = "im happy asf"
    emotion = query(payload)
    genre = "Telugu"
    return getPlaylists(db , genre , emotion)

if __name__ == "__main__":
    app.run(debug=True)