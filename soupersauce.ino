#include <SoftwareSerial.h>
SoftwareSerial mySerial(8,9);
#define YELLOW 5
#define GREEN 6
#define RED 3
#define ANALOG_BLUE 12
#define ANALOG_GREEN 11
#define ANALOG_RED 10
bool timer = false;
bool whisk = false;
bool heat = false;
bool commandsSent = false;
char whiskData = ' ';
int heatData;
int sec = 0;
bool numberEnd=false;
int redValue;
int greenValue;
int blueValue;
long previousMillis = 0;

void setup()
{
pinMode(RED, OUTPUT);
pinMode(GREEN, OUTPUT);
pinMode(YELLOW, OUTPUT);
digitalWrite(RED, LOW);
digitalWrite(GREEN, LOW);
digitalWrite(YELLOW, LOW);
digitalWrite(ANALOG_RED, LOW);
digitalWrite(ANALOG_GREEN, LOW);
digitalWrite(ANALOG_BLUE, LOW);

mySerial.begin(9600);   
Serial.begin(9600);   
delay(100);
}



void loop()
{
  if (mySerial.available()>0) {
    byte data = mySerial.read();
    if(data == byte('T')){
      timer = true;
      Serial.println("timer set true");
      timerSetting();
    }
    else if(data == byte('W')){
      whisk = true;
      Serial.println("whisk set true");
      whiskSetting();
    }
    else if(data == byte('H')){
      heat = true;
      Serial.println("Heat set true");
      heatSetting();
    }
    else if(data == byte('G')){
      Serial.println("commands sent");
      sendCommands();
      commandsSent = true;
    }
    else if(data == byte('S')){
      Serial.println("stopped");
      reset();
    }
  }
  if (commandsSent == true && timer == true){
      unsigned long currentMillis = millis();
      if (currentMillis - previousMillis >= sec*1000){
        reset();
      }
    }
}
void timerSetting(){
  while (numberEnd == false){
    Serial.println("timer");
    if (mySerial.available()>0) {
      char data = mySerial.read();
      if(data == 'A'){
        numberEnd = true;
        Serial.println("timer end");
      }
      else{
        int num = data - 48;
        sec = sec*10 +num;
      }    
    } 
  }
  
}
void whiskSetting(){
  Serial.println("whisk");
  if (mySerial.available()>0) {
    whiskData = mySerial.read();
    Serial.println(whiskData);
  }   
}
void heatSetting(){
  if (mySerial.available()>0) {
    heatData = mySerial.read();
    heatData = heatData - 48;
  } 
}
void sendCommands(){
   if(whisk == true){
      Serial.println("made it to whisk send");
      if(whiskData == '2'){
      Serial.println("yellow is happening");
      digitalWrite(YELLOW, HIGH);
      }
      else if(whiskData == '3'){
      Serial.println("red is happening");
      digitalWrite(RED, HIGH);
      }
      else if(whiskData == '1'){
      Serial.println("green is happening");
      digitalWrite(GREEN, HIGH);
      }    
   }
   if(heat == true){
    Serial.println("heat here");
    redValue = 28* heatData ;
    greenValue = 255 - 28*heatData;
    if(heatData <=5){
      blueValue = 126 + 14*heatData;
    }
    else{
      blueValue= 126 -14 * (heatData-4);
    }
    
    analogWrite(ANALOG_RED, redValue);
    analogWrite(ANALOG_GREEN, greenValue);
    analogWrite(ANALOG_BLUE, blueValue);
   }
   if(timer == true){
    previousMillis = millis();
   }
   
   
}

void reset(){
   timer = false;
   whisk = false;
   heat = false;
   commandsSent = false;
   whiskData = ' ';
   heatData = ' ';
   sec = 0;
   numberEnd=false;
   digitalWrite(GREEN, LOW);
   digitalWrite(RED, LOW);
   digitalWrite(YELLOW, LOW);
   digitalWrite(ANALOG_RED, LOW);
   digitalWrite(ANALOG_GREEN, LOW);
   digitalWrite(ANALOG_BLUE, LOW);
}
