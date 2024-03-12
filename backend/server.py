from flask import Flask,jsonify,request
from flask_cors import CORS
from connectMongo import connectToDatabase
from getMusic import get_playlists,get_songs,getGenreList
from emotionApi import query,get_emotions_list,get_statement

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

@app.route('/getGenreList',methods=['GET'])
def getGenList():
    return jsonify({"list" : getGenreList()})

@app.route('/getStatement',methods=['POST'])
def getEmoStatement():
    emotion = request.json.get('emotion')
    return jsonify({"statement" : get_statement(emotion)})

@app.route('/getPlaylist',methods=['POST'])
def getPlaylist():
    emotion = request.json.get('emotion')
    genre = request.json.get('genre')
    return jsonify({"link" : get_playlists(db, genre, emotion)})

@app.route('/getSong',methods=['POST'])
def getSongs():
    emotion = request.json.get('emotion')
    genre = request.json.get('genre')
    return jsonify({"link" : get_songs(db, genre, emotion)})

if __name__ == "__main__":
    app.run(debug=True)