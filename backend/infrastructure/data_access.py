import pandas as pd

class DataAccess:
    def __init__(self, file_path):
        self.file_path = file_path

    def load_data(self):
        column_names = ['target', 'ids', 'date', 'flag', 'user', 'text']
        df = pd.read_csv(self.file_path, encoding='ISO-8859-1', names=column_names)
        df_target_0 = df[df['target'] == 0]
        df_target_2 = df[df['target'] == 4]
        df_target_0_sampled = df_target_0.sample(n=5000, random_state=42)
        df_target_2_sampled = df_target_2.sample(n=5000, random_state=42)
        return pd.concat([df_target_0_sampled, df_target_2_sampled], ignore_index=True)
