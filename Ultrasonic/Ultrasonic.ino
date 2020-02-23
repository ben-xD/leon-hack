// Include the library:
#include <TM1637Display.h>
const int trigPin = 12;
const int echoPin = 11;
int demand;
bool changed;
long duration, cm;
const int numReadings = 3;
int tic = 0;
int toc = 0;
long readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
long total = 0;                  // the running total
long average = 0; 
int throwaway = 0; 
bool placed = false;
bool picked = false;
bool thrown = false;

// Define the connections pins:
#define CLK 2
#define DIO 3
// Create display object of type TM1637Display:
TM1637Display display = TM1637Display(CLK, DIO);

TM1637Display display_1  = TM1637Display(6, 7);

// Create array that turns all segments on:
const uint8_t data[] = {0xff, 0xff, 0xff, 0xff};
// Create array that turns all segments off:
const uint8_t blank[] = {0x00, 0x00, 0x00, 0x00};


void setup() { 
  display.clear();
  display_1.clear();
  delay(1000);
  Serial.begin(9600);
  demand = 2;
  cm = 0;
  changed = false;
  display.setBrightness(7);
  display_1.setBrightness(7);
  display.showNumberDec(0);
  display_1.showNumberDec(0);
} 
void loop()
{
  picked= false;
  placed = false;
  total = total - readings[readIndex];
  cm = pulse();
  if (cm < 5)
  {
    display_1.showNumberDec(0);
  }
  else if (cm < 20){
    display_1.showNumberDec(1);
  }
  else {
    display_1.showNumberDec(2);
  }
  if (sq(cm - average) > 25)
  {
    if (changed == false)
    {
      if (cm - average < 0){
        placed = true;
      }
      else {
        picked = true;
      }
      changed = true;
    }
  }
  else
  {
    changed = false;
  }
  if (placed)
  {
    demand = 1;
    tic = millis();
  }
  if (picked) {
    if (throwaway == 0){
      Serial.println("Picked up");
    }
    throwaway = 0;
    demand = 2;
    thrown = false;
  }
  if (demand == 1){
    toc = millis();
    if (toc - tic > 5000){
      if (cm < 5)
      {
        throwaway = 2;
        display.showNumberDec(2);
      }
      else {
        throwaway = 1;
        display.showNumberDec(1);
      }
    }
  }

  if (throwaway > 0){
    if (thrown == false){
      //Serial.print("Throw away ");
      Serial.println(throwaway);
      thrown = true;
    }
  }
  readings[readIndex] = cm;
  total = total + readings[readIndex];
  readIndex = readIndex + 1;
  if (readIndex >= numReadings) {
    readIndex = 0;
  }
  average = total / numReadings;
  delay(500);
}

long microsecondsToCentimeters(long microseconds)
{
  return microseconds / 29 / 2;
}

long pulse()
{
  pinMode(trigPin, OUTPUT); 
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(2); 
  digitalWrite(trigPin, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(trigPin, LOW);
  pinMode(echoPin, INPUT); 
  duration = pulseIn(echoPin, HIGH);
  cm = microsecondsToCentimeters(duration);
  return cm;
}
