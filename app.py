from flask import Flask, jsonify, render_template, request, send_from_directory
import numpy as np
import cv2
import base64
import pickle
import mediapipe as mp

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


def process_frame(frame_bgr):
    results = hands.process(frame_bgr)
    predicted_character = ""

    if results.multi_hand_landmarks:
        hand_landmarks = results.multi_hand_landmarks[0]

        mp_drawing.draw_landmarks(
            frame_bgr,
            hand_landmarks,
            mp_hands.HAND_CONNECTIONS,
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

        prediction = model.predict([np.asarray(data_aux)])
        predicted_character = labels_dict[int(prediction[0])]

    ok, buffer = cv2.imencode(".jpg", frame_bgr, [int(cv2.IMWRITE_JPEG_QUALITY), 70])
    if not ok:
        return predicted_character, None
    processed_b64 = base64.b64encode(buffer.tobytes()).decode("utf-8")
    return predicted_character, processed_b64


@app.route('/', methods=['GET', 'POST'])
def camera():
    if request.method == 'POST':
        payload = request.get_json(silent=True) or {}
        base64_string = payload.get("photo")
        if base64_string is None:
            base64_string = request.form.get("photo")
        if base64_string is None:
            return jsonify({"error": "missing photo field"}), 400
        image_bytes = base64.b64decode(base64_string)
        data = np.frombuffer(image_bytes, dtype=np.uint8)
        img = cv2.imdecode(data, cv2.IMREAD_COLOR)
        if img is None:
            return jsonify({"error": "invalid image data"}), 400

        predicted_character, processed_b64 = process_frame(img)
        return jsonify({
            "predicted_character": predicted_character,
            "processed_image": processed_b64,
        })
    return render_template('index.html')


@app.route('/images/<path:path>')
def static_proxy(path):
    return send_from_directory('images', path)


if __name__ == "__main__":
    app.run(debug=False, port=8001, threaded=False)
