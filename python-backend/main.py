from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send
import time
import sys
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app, cors_allowed_origins='*')


@socketio.on('waste')
def handle_message(message):
    print('received message', file=sys.stderr)
    print(json.dumps(message))
    socketio.emit('waste', message)


# @app.route('/')
# def index():
#     print("Emitting on waste channel")
#     socketio.emit('waste',
#                   {
#                       'Lentil Masala': {
#                           'name': 'Lentil Masala',
#                           'todaysWaste': 5
#                       }
#                   })
#     return "INDEX"


if __name__ == '__main__':
    socketio.run(app, debug=True)
