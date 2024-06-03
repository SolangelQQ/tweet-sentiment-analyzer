from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
import pandas as pd

class SentimentModel:
    def __init__(self, data_frame):
        self.vectorizer = TfidfVectorizer()
        X = self.vectorizer.fit_transform(data_frame['text'])
        y = data_frame['target']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.classifier = SVC(kernel='linear')
        self.classifier.fit(X_train, y_train)

    def predict(self, tweet):
        tweet_vectorized = self.vectorizer.transform([tweet])
        return int(self.classifier.predict(tweet_vectorized)[0])
