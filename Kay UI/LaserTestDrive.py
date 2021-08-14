#!/usr/bin/env python

import RPi.GPIO as GPIO
import time

GPIO_LASER = 27

if __name__ == '__main__':
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(GPIO_LASER, GPIO.OUT)
    
    try:
        #BLINKING
        time.sleep(1)
        GPIO.output(GPIO_LASER, 1)
        time.sleep(1.5)
        GPIO.output(GPIO_LASER, 0)
        time.sleep(1.5)
        GPIO.output(GPIO_LASER, 1)
        time.sleep(1.5)
        GPIO.output(GPIO_LASER, 0)
        time.sleep(1.5)
        GPIO.output(GPIO_LASER, 1)
        time.sleep(1.5)
        GPIO.output(GPIO_LASER, 0)
        time.sleep(1.5)
        GPIO.output(GPIO_LASER, 1)
    
    finally:
        time.sleep(1)
        GPIO.output(GPIO_LASER, 0)
        GPIO.cleanup()