from pymongo import MongoClient
import os

MONGO_URL = os.getenv('MONGO_URL')

DATABASE_NAME = 'Emuser'

def connectToDatabase():
    client = MongoClient(MONGO_URL)
    db = client[DATABASE_NAME]
    return db
