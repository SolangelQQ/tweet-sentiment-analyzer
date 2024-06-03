import os
import json

class JSONStorage:
    def __init__(self, file_path):
        self.file_path = file_path

    def save_analysis(self, entry):
        if os.path.exists(self.file_path):
            with open(self.file_path, 'r') as file:
                try:
                    history = json.load(file)
                except json.decoder.JSONDecodeError:
                    history = []
        else:
            history = []

        history.append(entry)

        with open(self.file_path, 'w') as file:
            json.dump(history, file, indent=4)
