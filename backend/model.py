import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer, PorterStemmer
from nltk.tokenize import word_tokenize

nltk.download("punkt")
nltk.download("wordnet")
nltk.download("stopwords")

df = pd.read_csv("dataset.csv")
X = df["text"]
y = df["emotion"]

lemmatizer = WordNetLemmatizer()
stemmer = PorterStemmer()
stop_words = set(stopwords.words("english"))


def preprocess_text(text):
    words = word_tokenize(text)

    words = [
        lemmatizer.lemmatize(stemmer.stem(word.lower()))
        for word in words
        if word.lower() not in stop_words
    ]

    return " ".join(words)


X_processed = X.apply(preprocess_text)

X_train, X_test, y_train, y_test = train_test_split(
    X_processed, y, test_size=0.2, random_state=42
)

pipeline = Pipeline(
    [
        ("vectorizer", TfidfVectorizer()),
        ("classifier", RandomForestClassifier(n_estimators=100, random_state=42)),
    ]
)

pipeline.fit(X_train, y_train)

y_pred = pipeline.predict(X_test)

print(classification_report(y_test, y_pred))

# Model failed due to lack of quality dataset
# Rebuild in a while
# New dataset found - link - https://www.kaggle.com/datasets/shivamb/go-emotions-google-emotions-dataset
