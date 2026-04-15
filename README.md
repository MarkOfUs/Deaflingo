# Deaflingo

Deaflingo is a sign language learning web application built with Python, Flask, HTML/CSS/JavaScript, and browser-to-backend HTTP requests.

## Demo

[![Deaflingo Demo Video](https://img.youtube.com/vi/7jd46k0xQxo/0.jpg)](https://youtu.be/7jd46k0xQxo)

## Overview

Deaflingo enables interactive sign language practice through webcam-based gesture recognition and real-time prediction feedback in the browser. The application captures webcam frames, sends them to the back end for hand-gesture inference, and returns predictions to create an accessible, interactive learning experience. Inference uses MediaPipe Hands landmarks, converts them into normalized x/y coordinate features, and classifies letters with a scikit-learn RandomForestClassifier.

## Features

- Interactive sign language practice in the browser
- Webcam-based hand gesture recognition
- Real-time prediction feedback
- Flask web application with browser-to-backend HTTP communication

## Tech Stack

- Python
- Flask
- OpenCV
- NumPy
- scikit-learn
- HTML, CSS, JavaScript

## Running Locally

1. Use **Python 3.11**.
2. Install [Git LFS](https://git-lfs.com/) and run:

```bash
git lfs install
```

3. Clone the repository.
4. Install the dependencies:

```bash
pip install -r requirements.txt
```

5. Start the app:

```bash
python app.py
```

6. Open `http://127.0.0.1:8001/` in your browser.

You should see:

```bash
* Running on http://127.0.0.1:8001/ (Press CTRL+C to quit)
```
