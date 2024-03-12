genreList = ["Rock" , "Metal" , "Grunge" , "Telugu" , "Hindi" , "Pop" , "Kannada" , "Instrumental" , "Themes" , "Korean"]

def get_playlists(db , genre , emotion):
    playlistsCol = db["Playlists"]

    query = { "genre" : genre , "emotion" : emotion }
    playlist = playlistsCol.aggregate([
        {"$match": query},
        {"$sample": {"size": 1}}
    ])
    returnPlaylist = list(playlist)
    if returnPlaylist:
        returnPlaylist[0]['_id'] = str(returnPlaylist[0]['_id'])
        return returnPlaylist[0]['link']
    else:
        return []
    
def get_songs(db , genre , emotion):
    songsCol = db["Songs"]

    query = { "genre": genre, "emotion": emotion}
    song = songsCol.aggregate([
        {"$match": query},
        {"$sample": {"size": 1}}
    ])
    returnSong = list(song)
    if returnSong:
        returnSong[0]['_id'] = str(returnSong[0]['_id'])
        return returnSong[0]['link']
    else:
        return []
    
def getGenreList():
    return genreList