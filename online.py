from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/move', methods=['POST'])
def move():
    data = request.json
    # Verarbeite Bewegung
    return jsonify(status="ok")

if __name__ == '__main__':
    app.run(debug=True)
