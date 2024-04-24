from flask import Flask, request, jsonify
import numpy as np
import cv2
from flask_cors import CORS
from keras.models import model_from_json
import base64

app = Flask(__name__)
CORS(app)

with open("disaster-severity.json", "r") as json_file:
    loaded_model_json = json_file.read()
loaded_model = model_from_json(loaded_model_json)
loaded_model.load_weights("disaster-severity.weights.h5")

def sigmoid_to_binary(prediction, threshold=0.5):
    return 1 if prediction >= threshold else 0

@app.route("/", methods=['POST'])
def prediction():
    #file = request.files['file']
    from PIL import Image
    # image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    file = request.files['file']
    #print('File from the POST request is: {}'.format(file))
    img = Image.open(file.stream)
    # img.show()
    img  =img.convert('RGB')
    img.save("recogImage.jpg")

    # image = cv2.imread('image_with_boxes.png')

    # print(image)
    print("Disaster")
    image = cv2.imread('recogImage.jpg')
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    images = []
    image_sizes = []
    height, width, _ = image.shape  # Retain the third dimension
    image_sizes.append((height, width))
    resized_img = cv2.resize(image, (64, 64))
    images.append(resized_img)

    prediction = loaded_model.predict(np.array([images[0]]))
    image = images[0]

    colors = [(0, 255, 0), (0, 0, 255), (255, 255, 0), (255, 0, 0)]
    print(prediction[0])

    no_damage = []
    minor_damage = []
    major_damage = []
    destroyed = []

    # with open("image_with_boxes.png", "rb") as img_file:
    #     img_encoded = base64.b64encode(img_file.read()).decode()
    #     img_data_url = f"data:image/png;base64,{img_encoded}"
        
        # return jsonify({'img_data_url': img_data_url, 'no_damage': no_damage, 'minor_damage': minor_damage, 'major_damage': major_damage, 'destroyed': destroyed})
    for result in prediction[0]:
        for result2 in result:
            if result2[4] >= 0.10:
                print("hi")
                x, y, w, h = result2[0], result2[1], result2[2], result2[3]
                x *= image.shape[1]
                y *= image.shape[0]
                w *= image.shape[1]
                h *= image.shape[0]

                class_index = np.argmax(result2[5:])
                if(class_index == 0):
                    print(0)
                    no_damage.append([x, y, w, h])
                elif(class_index == 1):
                    print(1)
                    minor_damage.append([x, y, w, h])
                elif(class_index == 2):
                    print(2)
                    major_damage.append([x, y, w, h])
                elif(class_index == 3):
                    print(3)
                    destroyed.append([x, y, w, h])
                cv2.rectangle(image, (int(x - w / 2), int(y - h / 2)), (int(x + w / 2), int(y + h / 2)), colors[class_index], 2)

    cv2.imwrite("image_with_boxes2.png", image)

    with open("image_with_boxes2.png", "rb") as img_file:
        img_encoded = base64.b64encode(img_file.read()).decode()
        img_data_url = f"data:image/png;base64,{img_encoded}"
        
        return jsonify({'img_data_url': img_data_url, 'no_damage': no_damage, 'minor_damage': minor_damage, 'major_damage': major_damage, 'destroyed': destroyed})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
