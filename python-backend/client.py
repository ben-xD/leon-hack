import socketio

# standard Python
sio = socketio.Client()
sio.connect('http://localhost:5000')
print('my sid is', sio.sid)

sio.emit('waste',
         {
             'Lentil Masala': {
                 'name': 'Lentil Masala',
                 'todaysWaste': 5
             }
         })

print("Sent")
sio.disconnect()
