#!/usr/bin/env python

import sys
import RPi.GPIO as GPIO
import time
import os
import LaserTestDrive

GPIO_X_SERVO = 4
GPIO_Y_SERVO = 17



# Calibrate to the requested position
def calibrate(coord_position):

    x_servo = GPIO.PWM(GPIO_X_SERVO, 50)
    y_servo = GPIO.PWM(GPIO_Y_SERVO, 50)

    x_servo.start(coord_position[0])
    y_servo.start(coord_position[1]) 
        
        
    time.sleep(1) # give the servos a chance to move
    # active = laser()
    # if active:
    #         # print('inside')
    #         time.sleep(1)
    #         default_position(coord_position[0],coord_position[1])
    #         GPIO.cleanup()
    #         print('Done!')
# Active the laser for 3 sec with execute the laser scrypt 
def laser ():
    os.system('./LaserGUI.py')
    return True

def CalibrateGUI(x_position, y_position):
    
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(GPIO_X_SERVO, GPIO.OUT)
    GPIO.setup(GPIO_Y_SERVO, GPIO.OUT)

    coord_position = [x_position, y_position]

    calibrate(coord_position)

    # try:
    #     calibrate(coord_position)
    # finally:
    #     active = laser()
    #     if active:
    #         # print('inside')
    #         # time.sleep(1)
    #         # default_position()
    #         GPIO.cleanup()
    #         print('Done!')