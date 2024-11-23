import spotipy
from flask import Flask
import requests
import json
from spotipy.oauth2 import SpotifyClientCredentials
from pymongo import MongoClient

app = Flask(__name__)

MONGO_URL='mongodb+srv://aishwaryaad009:Aish%402003@cluster0.lszx7iu.mongodb.net/contacts?retryWrites=true&w=majority'
client=MongoClient(MONGO_URL)
db=client['Spotify_data']
collection=db['playlist_data']
# collection.delete_many({})

SPOTIPY_CLIENT_ID = 'a01b6b14154b40708b3248ac5c490e50'
SPOTIPY_CLIENT_SECRET = '98dc1fcc5a5340c2972b5de1aa3736fa'

client_credentials_manager=SpotifyClientCredentials(client_id=SPOTIPY_CLIENT_ID,client_secret=SPOTIPY_CLIENT_SECRET)
sp=spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# access_token = 'BQDghiI-wbUuBKYBo0aHBt4qd51EfoULNxFJWllbjGIAhnjmr_r2Sk91HzbEs6dSTWk6D5fO_e6rGZNWxul9RWrqnj4HR1Xr_2eICCLfZ5MLKKm2DWM'
# url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
# headers = {'Authorization': f'Bearer {access_token}'}
# response = requests.get(url, headers=headers)
# playlist = response.json()
# print(json.dumps(playlist,indent=4))
# playlist_id='37i9dQZF1DWZdLqpoFOt65'

@app.route("/storesongsindb/<playlist_id>",methods=['GET'])
def storesongs(playlist_id):
    playlist_data = sp.playlist(playlist_id)
    playlist_name=playlist_data['name']
    song=[]
    for item in playlist_data['tracks']['items']:
        track = item['track']
        track_name = track['name']
        spotify_url = track['external_urls']['spotify']

        # print(f"Track: {track_name}")
        # print(f"Spotify URL: {spotify_url}")

        song.append({
            "playlist_name":playlist_name,
            "track_name": track_name,
            "genre": "Unknown",
            "song_url": spotify_url
        })

    collection.insert_many(song)
    return {"message":"Playlist data inserted successfully"},20

if __name__ == "__main__":
    app.run(debug=True)