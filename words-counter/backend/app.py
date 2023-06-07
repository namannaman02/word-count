from flask import Flask, request, jsonify
import re

app = Flask(__name__)


@app.route('/api/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file:
        # Read the file content
        content = file.read().decode('utf-8')
        # Convert to lowercase for case-insensitive word counting
        content = content.lower()
        # Split the content into words
        words = re.findall(r'\b\w+\b', content.lower())
        # Count the occurrences of each word
        word_counts = {}
        for word in words:
            if word not in word_counts:
                word_counts[word] = 1
            else:
                word_counts[word] += 1
        # Return the word counts as JSON response
        return jsonify(word_counts)
    else:
        return jsonify(error='No file uploaded')

if __name__ == '__main__':
    app.run(debug=True, port = 4999)
