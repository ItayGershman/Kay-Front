from time import sleep
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
import os
pan = 4
tilt = 17

GPIO.setup(tilt, GPIO.OUT) # white => TILT
GPIO.setup(pan, GPIO.OUT) # gray ==> PAN

def setServoAngle(servo, angle):
	assert angle >=0 and angle <= 180
	pwm = GPIO.PWM(servo, 50)
	pwm.start(8)
	dutyCycle = angle / 18. + 3.
	pwm.ChangeDutyCycle(dutyCycle)
	sleep(0.3)
	pwm.stop()
	laser()

def laser ():
    os.system('./LaserGUI.py')
    return True

def CalibrateGUI(x_position, y_position):
    print(x_position, y_position)
    setServoAngle(pan, x_position) # 0 ==> 90 (middle point) ==> 180
    setServoAngle(tilt, y_position) # 0 ==> 90 (middle point) ==> 180
