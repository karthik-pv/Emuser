from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'flask server is up'

if __name__ == "__main__":
    app.run(debug=True)