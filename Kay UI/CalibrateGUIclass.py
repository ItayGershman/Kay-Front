#!/usr/bin/env python

import sys
import RPi.GPIO as GPIO
import time
import os
import LaserTestDrive

GPIO_X_SERVO = 4
GPIO_Y_SERVO = 17

class Calibrate:
    def __init__(self): 
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(GPIO_X_SERVO, GPIO.OUT)
        GPIO.setup(GPIO_Y_SERVO, GPIO.OUT)        
        self.x_servo = GPIO.PWM(GPIO_X_SERVO, 50)
        self.y_servo = GPIO.PWM(GPIO_Y_SERVO, 50)
    
    def move_x(self,x):
        self.x = x
        self.x_servo.start(x)
        time.sleep(1)
        self.x_servo.stop()
        
    def move_y(self,y):
        self.y = y
        self.y_servo.start(y)
        time.sleep(1)

    def laser ():
        os.system('./LaserGUI.py')

