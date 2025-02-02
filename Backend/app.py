from flask import Flask, request, jsonify
import mysql.connector
from bcrypt import hashpw, gensalt, checkpw
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import os

app = Flask(__name__)
CORS(app)
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '@ditikA123',  
    'database': 'Arogya'
}

# Register a new user
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Hash the password
    hashed_password = hashpw(password.encode('utf-8'), gensalt())

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Insert the user into the database
        query = "INSERT INTO users (email, password_hash) VALUES (%s, %s)"
        cursor.execute(query, (email, hashed_password))
        connection.commit()

        return jsonify({'message': 'User registered successfully'}), 201
    except mysql.connector.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 400
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# update the PCOS prediction for a registered user
@app.route('/update_pcos', methods=['POST'])
def updatePCOS():
    data = request.json
    prediction = data.get('prediction')
    user_id = data.get('user_id')

    if not prediction or not user_id:
        return jsonify({'error': 'User required'}), 400
    
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Insert the user into the database
        query = "UPDATE users SET pcos = %s WHERE id = %s"
        cursor.execute(query, (prediction, user_id))
        connection.commit()

        return jsonify({'message': 'PCOS prediction updated successfully'}), 201
    except mysql.connector.IntegrityError:
        return jsonify({'error': 'User not found'}), 400
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Login an existing user
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        # Retrieve the user from the database
        query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        if user and checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            return jsonify({'message': 'Login successful', 'user_id': user['id']}), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

model = tf.keras.models.load_model('/Users/aditikasingh/Arogya/Backend/pcos_model_downloadable.h5')

# Add this after loading the PCOS model
usg_classifier = tf.keras.models.load_model('/Users/aditikasingh/Arogya/Backend/usg_classifier.h5')

@app.route('/predict', methods=['POST'])
# ultrasound classifier and PCOS model are loaded as `usg_classifier` and `model`
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file in the request'}), 400
    
    img_file = request.files['image']
    
    if img_file:
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], img_file.filename)
        img_file.save(img_path)

        try:
            # Preprocess image
            img = image.load_img(img_path, target_size=(224, 224))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0) / 255.0

            # First check if it's an ultrasound
            ultrasound_pred = usg_classifier.predict(img_array)
            if ultrasound_pred[0][0] < 0.5:  # Adjust threshold if needed
                print("not valid image")
                return jsonify({
                    'error': 'Image is not a valid ultrasound',
                    'image_path': img_path
                })  # Respond with 'Not an ultrasound' error
            else:
                # If ultrasound is valid, proceed with PCOS prediction
                pcos_prediction = model.predict(img_array)
                confidence = float(pcos_prediction[0][0] * 100)
                result = 'PCOS Detected, do consult a healthcare professional immediately.' if pcos_prediction[0] > 0.5 else 'No PCOS Detected, however, it is recommended to consult a healthcare professional'

                return jsonify({
                    'prediction': result,
                    'confidence': confidence,
                    'image_path': img_path,
                    'ultrasound_check': 'Valid ultrasound image'
                })

        except Exception as e:
            return jsonify({'error': f'Error processing image: {str(e)}'}), 500

    return jsonify({'error': 'Image file is not valid'}), 400

from id3.id3 import predict_for_new_user

@app.route('/predict-pcos', methods=['POST'])
def predictPcos():
    data = request.json
    age = data.get('age')
    weight = data.get('weight')
    height = data.get('height')
    blood_group = data.get('blood_group')
    period_months = data.get('period_months')
    gained_weight = data.get('gained_weight')
    excessive_hair_growth = data.get('excessive_hair_growth')
    skin_darkening = data.get('skin_darkening')
    hair_loss = data.get('hair_loss')
    pimples = data.get('pimples')
    eat_fast_food = data.get('eat_fast_food')
    reg_exercise = data.get('reg_exercise')
    mood_swings = data.get('mood_swings')
    reg_periods = data.get('reg_periods')
    period_days = data.get('period_days')
    PCOS = "null"

    print(data)

    input = {
        "age": age,
        "weight": weight,
        "height": height,
        "blood_group": blood_group,
        "period_months": period_months,
        "gained_weight": gained_weight,
        "excessive_hair_growth": excessive_hair_growth,
        "skin_darkening": skin_darkening,
        "hair_loss": hair_loss,
        "pimples": pimples,
        "eat_fast_food": eat_fast_food,
        "reg_exercise": reg_exercise,
        "mood_swings": mood_swings,
        "reg_periods": reg_periods,
        "period_days": period_days,
        "PCOS": PCOS
    }

    print(input)
    
    prediction = predict_for_new_user(input)
    
    return jsonify({'prediction': 'You may have PCOS. Upload an ultrasound image for better analysis. Please consult a healthcare professional for confirmation.' if prediction == 1 else 'It seems unlikely you have PCOS. Upload an ultrasound image for better diagnosis. Consult a healthcare professional for confirmation.'})


if __name__ == '__main__':
    app.run(debug=True, port=8801)
