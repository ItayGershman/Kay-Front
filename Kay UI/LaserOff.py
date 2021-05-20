#!/usr/bin/env python

import RPi.GPIO as GPIO
import time

GPIO_LASER = 27

if __name__ == '__main__':
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(GPIO_LASER, GPIO.OUT)
    GPIO.output(GPIO_LASER, 0)
    GPIO.cleanup()