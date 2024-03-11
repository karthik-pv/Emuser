from pymongo import MongoClient

MONGO_URL = "mongodb+srv://KarthikPV:STAIRWAY7@karthikpv.q4pis6e.mongodb.net/?retryWrites=true&w=majority&appName=KarthikPV"
DATABASE_NAME = "Emuser"

def connectToDatabase():
    client = MongoClient(MONGO_URL)
    db = client[DATABASE_NAME]
    return db
