import sys
import os
from time import sleep
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

pan = 4
tilt = 17

GPIO.setup(tilt, GPIO.OUT)  # white => TILT
GPIO.setup(pan, GPIO.OUT)  # gray ==> PAN

# Return to defult position


def setDeafultPanAngle():
    pwm = GPIO.PWM(pan, 50)
    pwm.start(8)
    dutyCycle = 90 / 18. + 3.
    print('default pan:', dutyCycle)
    pwm.ChangeDutyCycle(dutyCycle)
    sleep(0.3)
    pwm.stop()
    # setDeafultTiltAngle()
    return True


def setDeafultTiltAngle():
    pwm = GPIO.PWM(tilt, 50)
    pwm.start(8)
    dutyCycle = 0 / 18. + 3.
    print('default tilt:', dutyCycle)
    pwm.ChangeDutyCycle(dutyCycle)
    sleep(0.3)
    pwm.stop()
    return True


# Calibrate to the requested position
def setServoAngle(servo, angle):
    assert angle >= 0 and angle <= 180
    # print('inside')
    pwm = GPIO.PWM(servo, 50)
    pwm.start(8)
    dutyCycle = angle / 18. + 3.
    print(dutyCycle)
    print(type(dutyCycle))
    pwm.ChangeDutyCycle(dutyCycle)
    sleep(0.3)
    pwm.stop()
    return True


# Active the laser for 3 sec with execute the laser scrypt
def laser():
    os.system('./LaserTestDrive.py')
    return True


if __name__ == '__main__':

    # print('calibarating...')
    x_position = int(sys.argv[1])
    y_position = int(sys.argv[2])
    flag_x = False
    flag_y = False
	
    try:
        os.system('./LaserGUI.py')
        # 0 ==> 90 (middle point) ==> 180
        flag_x = setServoAngle(pan, x_position)
        # 0 ==> 90 (middle point) ==> 180
        flag_y = setServoAngle(tilt, y_position)
    finally:
        if flag_x is True and flag_y is True:
            active = laser()
            if active:
                # print('inside')
                sleep(1)
                setDeafultPanAngle()
                sleep(1)
                setDeafultTiltAngle()
                sleep(1)
                GPIO.cleanup()
                print('Done!')