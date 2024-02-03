from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import os

app = Flask(__name__)
CORS(app)
blob_file_path='../frontend/public/blob'

# Set the upload folder
UPLOAD_FOLDER = '../frontend/public'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    # If the user does not select a file, the browser submits an empty file without a filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Save the file to the upload folder
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
    with open(blob_file_path, 'rb') as blob_file:
        blob_data = blob_file.read()
        blob_io = BytesIO(blob_data)

# Open the image using Pillow
        img = Image.open(blob_io)

# Save the image as a PNG file
        img.save("../frontend/public/converted_image.png")
        return jsonify({'message': 'File successfully uploaded', 'file_path': file_path})

if __name__ == '__main__':
    app.run(debug=True)
