import requests

API_URL = "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions"
headers = {"Authorization": "Bearer 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"}

emotion_mapper = {
    "joy" : ["pride" , "gratitude" , "surprise" , "amusement" ,"excitement" , "admiration" , "relief" , "joy" , "approval" , "optimism"] ,
    "sorrow" : ["grief" , "remorse" , "embarassment","disapproval" , "sadness","disappointment"] ,
    "anger" : ["disgust","anger","annoyance"] ,
    "neutral" : ["neutral","curiosity","confusion"] ,
    "love" :["love" , "desire" , "caring"] ,
    "fear" : ["fear" , "nervousness"]
}

def query(payload): 
    response = requests.post(API_URL, headers=headers, json=payload)
    first = response.json()[0]
    toCheck = []
    emoCounter = {"joy" : 0 , "sorrow" : 0 , "anger" : 0 , "neutral" : 0 , "love" : 0 , "fear" : 0}
    for i in range(0,3):
        emotion = first[i]
        toCheck.append(map_emotion(emotion["label"]))
    for i in toCheck:
        emoCounter[i] += 1
    return determine_emotion(emoCounter,first)


def map_emotion(emotion):
    for category, emotions in emotion_mapper.items():
        if emotion in emotions:
            return category
    return "neutral"

def determine_emotion(emoCounter,first):
    max_count = max(emoCounter.values())
    max_emotions = [emotion for emotion, count in emoCounter.items() if count == max_count]
    if(len(max_emotions) > 1):
        return first[0]["label"]
    return max_emotions[0]