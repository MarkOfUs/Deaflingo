# Deaflingo

Deaflingo is a sign language learning web application built with Python, Flask, HTML/CSS/JavaScript, and browser-backend HTTP requests.

## Demo

[![Deaflingo Demo Video](https://img.youtube.com/vi/7jd46k0xQxo/0.jpg)](https://youtu.be/7jd46k0xQxo)

## Overview

Deaflingo enables interactive sign language practice through webcam-based gesture recognition and real-time prediction feedback in the browser. The application processes webcam frames on the back end, runs hand-gesture inference, and returns predictions to support an accessible, interactive learning experience.

## Features

- Interactive sign language practice in the browser
- Webcam-based hand gesture recognition
- Real-time prediction feedback
- Flask web app with browser-backend HTTP communication

## Tech Stack

- Python
- Flask
- OpenCV
- NumPy
- scikit-learn
- HTML, CSS, JavaScript

## Running Locally

1. Clone the repository.

2. Install the required dependencies:

```bash
pip install -r requirements.txt
````

On macOS, use:

```bash
pip install -r requirements-mac.txt
```

3. Start the application:

```bash
python app.py
```

4. Open your browser to `http://127.0.0.1:8001/`.

The Flask development server should display output similar to:

```bash
* Running on http://127.0.0.1:8001/ (Press CTRL+C to quit)
```
