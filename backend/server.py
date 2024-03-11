from flask import Flask,jsonify,request
from flask_cors import CORS
from connectMongo import connectToDatabase
from getMusic import getPlaylists , getSongs
from emotionApi import query,get_emotions_list

app = Flask(__name__)
CORS(app)
db = connectToDatabase()

@app.route('/')
def home():
    payload = "im happy asf"
    emotion = query(payload)
    genre = "Telugu"
    return getPlaylists(db , genre , emotion)

@app.route('/getEmoList',methods=['GET'])
def getEmoList():
    return jsonify({"list" : get_emotions_list()})


@app.route('/getEmotion',methods=['POST'])
def getEmo():
    payload = request.json.get('text')
    emotion = query(payload)
    return jsonify({"emotion" : emotion})

if __name__ == "__main__":
    app.run(debug=True)