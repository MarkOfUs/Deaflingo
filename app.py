from flask import Flask, render_template, request, send_from_directory, make_response
import numpy as np
from PIL import Image, ImageEnhance
import cv2
import io
import base64
import pickle
import mediapipe as mp
import json

app = Flask(__name__)

model_dict = pickle.load(open('./model.p', 'rb'))
model = model_dict['model']

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

labels_dict = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J',
    10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S',
    19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'
}


def update():
    # Open the raw image
    try:
        raw_image = Image.open("images/raw.jpg")
    except FileNotFoundError:
        print("Error: The file 'raw.jpg' was not found.")
        return

    frame = np.array(raw_image)
    H, W, _ = frame.shape

    # Convert the frame from RGB to BGR
    frame_bgr = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
    results = hands.process(frame_bgr)

    if results.multi_hand_landmarks:
        # Take the first detected hand
        hand_landmarks = results.multi_hand_landmarks[0]

        mp_drawing.draw_landmarks(
            frame_bgr,  # image to draw
            hand_landmarks,  # model output
            mp_hands.HAND_CONNECTIONS,  # hand connections
            mp_drawing_styles.get_default_hand_landmarks_style(),
            mp_drawing_styles.get_default_hand_connections_style())

        data_aux = []
        x_ = []
        y_ = []

        for i in range(len(hand_landmarks.landmark)):
            x = hand_landmarks.landmark[i].x
            y = hand_landmarks.landmark[i].y

            x_.append(x)
            y_.append(y)

        for i in range(len(hand_landmarks.landmark)):
            x = hand_landmarks.landmark[i].x
            y = hand_landmarks.landmark[i].y
            data_aux.append(x - min(x_))
            data_aux.append(y - min(y_))

        x1 = int(min(x_) * W) - 10
        y1 = int(min(y_) * H) - 10

        x2 = int(max(x_) * W) - 10
        y2 = int(max(y_) * H) - 10

        prediction = model.predict([np.asarray(data_aux)])

        predicted_character = labels_dict[int(prediction[0])]

        data = {"predicted_character": predicted_character}
        with open('json/output.json', 'w') as json_file:
            json.dump(data, json_file)

    # Convert numpy array back to PIL image
    processed = Image.fromarray(cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB))


    # Save the processed image with text as "processed.jpg"
    processed.save("images/processed.jpg")


@app.route('/', methods=['GET', 'POST'])
def camera():
    if request.method == 'POST' and request.form.get("photo") != None:
        base64_string = request.form.get("photo")

        image_bytes = base64.b64decode(base64_string)

        in_memory_file = io.BytesIO(image_bytes)
        data = np.frombuffer(in_memory_file.getvalue(), dtype=np.uint8)
        color_image_flag = 1
        img = cv2.imdecode(data, color_image_flag)

        cv2.imwrite("images/raw.jpg", img)

        update()

        return render_template('index.html')
    else:
        return render_template('index.html')


@app.route('/images/<path:path>')
def static_proxy(path):
    return send_from_directory('images', path)


@app.route('/json/<path:path>')
def send_json(path):
    response = make_response(send_from_directory('json', path))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response


if __name__ == "__main__":
    app.run(debug=True, port=8001)
