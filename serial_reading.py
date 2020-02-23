import serial
import time

ser = serial.Serial("COM8", 9600)
while True:
     cc=str(ser.readline())[2:][:-5]
     if cc == "1" or cc == "2":
         print("Throw away ")
     print(cc)
     print(time.time())