import json
import os

class UserStorage:
    def __init__(self, file_path):
        self.file_path = file_path
        self.users = self._load_users()

    def _load_users(self):
        if os.path.exists(self.file_path):
            with open(self.file_path, 'r') as file:
                try:
                    return json.load(file)
                except json.decoder.JSONDecodeError:
                    return []
        return []

    def validate_user(self, username, password):
        for user in self.users:
            if user['username'] == username and user['password'] == password:
                return True
        return False
