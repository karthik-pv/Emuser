from flask import jsonify
import re
import base64
import requests

CLIENT_ID = 'a01b6b14154b40708b3248ac5c490e50'
CLIENT_SECRET = '98dc1fcc5a5340c2972b5de1aa3736fa'

SPOTIFY_API_URL = 'https://api.spotify.com/v1'
TOKEN_URL = 'https://accounts.spotify.com/api/token'

def get_access_token():
    credentials = f"{CLIENT_ID}:{CLIENT_SECRET}"
    encoded_credentials = base64.b64encode(credentials.encode('ascii')).decode('ascii')
    auth_response = requests.post(
        TOKEN_URL,
        headers={'Authorization': 'Basic ' + encoded_credentials},
        data={'grant_type': 'client_credentials'}
    )
    return auth_response.json().get('access_token', None)

def get_track_details(spotifyURL):

    track_id = extract_track_id(spotifyURL)

    access_token = get_access_token()

    if access_token:
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get(f'{SPOTIFY_API_URL}/tracks/{track_id}', headers=headers)

        if response.status_code == 200:
            track_details = response.json()
            return jsonify({'track_details': track_details})
        else:
            return jsonify({'error': 'Failed to fetch track details'}), 500
    else:
        return jsonify({'error': 'Failed to obtain access token'}), 500

def extract_track_id(spotify_url):
    pattern = r'/track/([a-zA-Z0-9]+)'
    match = re.search(pattern, spotify_url)
    if match:
        track_id = match.group(1)
        return(track_id)