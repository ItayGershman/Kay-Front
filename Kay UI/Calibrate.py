#!/usr/bin/env python

import sys
import RPi.GPIO as GPIO
import time
import os
import LaserTestDrive

GPIO_X_SERVO = 4
GPIO_Y_SERVO = 17

# Return to defult position
def default_position():
    x_servo = GPIO.PWM(GPIO_X_SERVO, 50)
    y_servo = GPIO.PWM(GPIO_Y_SERVO, 50)
        
    x_servo.start(7.5) # Servo: 7.5 is 90 degrees
    y_servo.start(2.5) # Servo: 2.5 is 0 degrees
        
        
    time.sleep(1) # give the servos a chance to move

# Calibrate to the requested position
def calibrate(coord_position):

    x_servo = GPIO.PWM(GPIO_X_SERVO, 50)
    y_servo = GPIO.PWM(GPIO_Y_SERVO, 50)
  
    x_servo.start(float(coord_position[0]))
    y_servo.start(float(coord_position[1])) 
        
        
    time.sleep(1) # give the servos a chance to move
    
# Active the laser for 3 sec with execute the laser scrypt 
def laser ():
    os.system('./LaserTestDrive.py')
    return True

if __name__ == '__main__':
    GPIO.setmode(GPIO.BCM)

    GPIO.setup(GPIO_X_SERVO, GPIO.OUT)
    GPIO.setup(GPIO_Y_SERVO, GPIO.OUT)

    # print('calibarating...')
    x_position = sys.argv[1]
    y_position = sys.argv[2]

    coord_position = [x_position, y_position]
    # print 'coord_position:', coord_position
    # new_coord_position = get_pwd(coord_position)

    try:
        calibrate(coord_position)
    finally:
        active = laser()
        if active:
            # print('inside')
            time.sleep(1)
            default_position()
            GPIO.cleanup()
            print('Done!')
