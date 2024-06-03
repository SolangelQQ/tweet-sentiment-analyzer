from core.model import SentimentModel

class SentimentAnalysisService:
    def __init__(self, data_access, storage):
        self.data_frame = data_access.load_data()
        self.model = SentimentModel(self.data_frame)
        self.storage = storage

    def classify_tweet(self, tweet):
        sentiment = self.model.predict(tweet)
        self.storage.save_analysis({'tweet': tweet, 'sentiment': sentiment})
        return sentiment

    def get_data(self):
        return self.data_frame.to_dict(orient='list')
