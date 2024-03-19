import requests
import os

API_URL = 'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions'
headers = {"Authorization": os.getenv("AUTH")}

emotion_list = ["joy" , "sorrow" , "anger" , "neutral" ,"love" , "fear"]

emotion_mapper = {
    "joy" : ["pride" , "gratitude" , "surprise" , "amusement" ,"excitement" , "admiration" , "relief" , "joy" , "approval" , "optimism"] ,
    "sorrow" : ["grief" , "remorse" , "embarassment","disapproval" , "sadness","disappointment"] ,
    "anger" : ["disgust","anger","annoyance"] ,
    "neutral" : ["neutral","curiosity","confusion"] ,
    "love" :["love" , "desire" , "caring"] ,
    "fear" : ["fear" , "nervousness"]
}

statement_mapper = {
    "joy" : "You seem to be in a joyful mood....that's gooooood.....let's celebrate and be happier together" ,
    "sorrow" : "Looks like you feel down and out.....we all have those days.....allow me to make you feel better" ,
    "anger" : "Yikes you're pissed off.....lets not do anything rash.....let me help you calm down" ,
    "neutral" : "You're not having any strong feelings rn or maybe my AI model just crashed....anyway music isn't restricted to when you feel something",
    "love" : "Awww....love is in the air.....very cute.....cheers to you",
    "fear" : "You seem unsettled and worried.......allow me to comfort you with a musical touch"
}

def query(payload): 
    response = requests.post(API_URL, headers=headers, json=payload)
    try:
        first = response.json()[0]
        toCheck = []
        emoCounter = {"joy" : 0 , "sorrow" : 0 , "anger" : 0 , "neutral" : 0 , "love" : 0 , "fear" : 0}
        for i in range(0,3):
            emotion = first[i]
            toCheck.append(map_emotion(emotion["label"]))
        for i in toCheck:
            emoCounter[i] += 1
        return determine_emotion(emoCounter,first)
    except:
        return "neutral"


def map_emotion(emotion):
    for category, emotions in emotion_mapper.items():
        if emotion in emotions:
            return category
    return "neutral"

def determine_emotion(emoCounter,first):
    max_count = max(emoCounter.values())
    max_emotions = [emotion for emotion, count in emoCounter.items() if count == max_count]
    if(len(max_emotions) > 1):
        return map_emotion(first[0]["label"])
    return max_emotions[0]

def get_emotions_list():
    return emotion_list

def get_statement(emotion):
    statement = statement_mapper.get(emotion, "No statement available for this emotion")
    return statement