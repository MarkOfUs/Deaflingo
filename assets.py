import os
import urllib.request

RELEASE_URL = "https://github.com/MarkOfUs/Deaflingo/releases/download/model-v1"


def ensure_asset(filename):
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)
    if not os.path.exists(path):
        print(f"Downloading {filename} from GitHub releases...")
        urllib.request.urlretrieve(f"{RELEASE_URL}/{filename}", path)
    return path
