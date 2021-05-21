# MQTT Client demo
# Continuously monitor two different MQTT topics for data,
# check if the received data matches two predefined 'commands'
 
import paho.mqtt.client as mqtt
import os
import time
import subprocess
from CalibrateGui import *

x = 90
y = 0

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
 
    # Subscribing in on_connect() - if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("KAY/video")
    client.subscribe("KAY/move-x")
    client.subscribe("KAY/move-y")
    client.subscribe("KAY/submit")
    client.subscribe("KAY/check")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    msg.payload = str(msg.payload)
    print(msg.topic+" "+str(msg.payload))
    
    if msg.topic == "KAY/move-x":
        global x, y
        print('msg.payload:', msg.payload )
        x = msg.payload
        x = float(x)
        CalibrateGUI(x,y)

    if msg.topic == "KAY/move-y":
        global x, y
        print('msg.payload:', msg.payload )
        y = msg.payload
        y = float(y)
        CalibrateGUI(x,y)
    
    if msg.topic == "KAY/submit":
        print('msg.payload:', msg.payload )
        os.system('./LaserOff.py')
        print('Laser OFF!')
    
    if msg.topic == "KAY/check":
        print('msg.payload:', msg.payload )
        os.system('./LaserGUI.py')
        print('CHECK!' )

# Create an MQTT client and attach our routines to it.
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
 
client.connect("test.mosquitto.org", 1883, 60)
 
# Process network traffic and dispatch callbacks. This will also handle
# reconnecting. Check the documentation at
# https://github.com/eclipse/paho.mqtt.python
# for information on how to use other loop*() functions
client.loop_forever()