import socketio
import serial
import time

def emit_message(value,totalsold):
    sio = socketio.Client()
    sio.connect('http://localhost:5000')
    print('my sid is', sio.sid)

    sio.emit('waste',
            {
                'Lentil Masala': {
                    'name': 'Lentil Masala',
                    'todaysWaste': value,
                    'todaysSales': totalsold
                }
            })
    print("Sent")
    sio.disconnect()


ser = serial.Serial("COM8", 9600)
totalwaste = 0
totalsold = 0
while True:
    cc=str(ser.readline())[2:][:-5]
    if cc == "1" or cc == "2":
         totalwaste += int(cc)
    elif cc == "Picked up":
        totalsold += 1  
    emit_message(totalwaste,totalsold)

