from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send
# from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app, cors_allowed_origins='*')


@app.route('/')
def index():
    print("Emitting on waste channel")
    socketio.emit('waste', {'data': 42})
    return "INDEX"
    # return render_template('index.html')


@socketio.on('message')
def handle_message(message):
    print("Received message: ", message)
    send({'data': 'got it!'})
    return "MESSAGE"


if __name__ == '__main__':
    socketio.run(app)
