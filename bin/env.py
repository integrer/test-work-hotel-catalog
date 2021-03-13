from os import path
from dotenv.main import load_dotenv


def configure(mode: str, location: str):
    test_dotenv_files = [f'.env.{mode}.local', f'.env.{mode}', '.env.local', '.env']
    for file in test_dotenv_files:
        filepath = path.join(location, file)
        if path.isfile(filepath):
            load_dotenv(filepath)
