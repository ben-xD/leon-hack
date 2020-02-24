import socketio

sio = socketio.Client()
sio.connect('http://localhost:5000')
print('my sid is', sio.sid)

value = 50
totalsold = 20
sio.emit('waste',
         {
             'Lentil Masala': {
                 'name': 'Lentil Masala',
                 'pastWeekWaste':  [0, 1, 3, 6, 10, 12, value],
                 'pastWeekSold': [200, 220, 205, 195, 180, 400, totalsold]
             }
         })
print("Sent")
sio.disconnect()
