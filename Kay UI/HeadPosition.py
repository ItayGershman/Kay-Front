from time import sleep
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
import os
pan = 4
tilt = 17
import sys

GPIO.setup(tilt, GPIO.OUT) # white => TILT
GPIO.setup(pan, GPIO.OUT) # gray ==> PAN

def setServoAngle(servo, angle):
	assert angle >=0 and angle <= 180
	pwm = GPIO.PWM(servo, 50)
	pwm.start(8)
	dutyCycle = angle / 18. + 3.
	pwm.ChangeDutyCycle(dutyCycle)
	sleep(1)
	pwm.stop()
	# laser()

def defaultPositionX(servo):
	# assert angle >=0 and angle <= 180
	pwm = GPIO.PWM(servo, 50)
	pwm.start(8)
	dutyCycle = 7.5
	pwm.ChangeDutyCycle(dutyCycle)
	sleep(1)
	pwm.stop()

def defaultPositionY(servo):
	# assert angle >=0 and angle <= 180
	pwm = GPIO.PWM(servo, 50)
	pwm.start(8)
	dutyCycle = 2.5
	pwm.ChangeDutyCycle(dutyCycle)
	sleep(1)
	pwm.stop()
	# laser()
# Return to defult position
# def default_position():
#     x_servo = GPIO.PWM(GPIO_X_SERVO, 50)
#     y_servo = GPIO.PWM(GPIO_Y_SERVO, 50)
        
#     x_servo.start(7.5) # Servo: 7.5 is 90 degrees
#     y_servo.start(2.5) # Servo: 2.5 is 0 degrees
        
        
#     time.sleep(1) # give the servos a chance to move

# Calibrate to the requested position
# def calibrate(coord_position):

#     x_servo = GPIO.PWM(GPIO_X_SERVO, 50)
#     y_servo = GPIO.PWM(GPIO_Y_SERVO, 50)
  
#     x_servo.start(float(coord_position[0]))
#     y_servo.start(float(coord_position[1])) 
        
        
#     time.sleep(1) # give the servos a chance to move
    
# Active the laser for 3 sec with execute the laser scrypt 
# def laser ():
#     os.system('./LaserTestDrive.py')
#     return True

if __name__ == '__main__':
    # GPIO.setmode(GPIO.BCM)

    # GPIO.setup(GPIO_X_SERVO, GPIO.OUT)
    # GPIO.setup(GPIO_Y_SERVO, GPIO.OUT)

    # print('calibarating...')
    x_position = sys.argv[1]
    y_position = sys.argv[2]

    # coord_position = [x_position, y_position]
    # print 'coord_position:', coord_position
    # new_coord_position = get_pwd(coord_position)

    try:
        setServoAngle(pan, x_position) # 0 ==> 90 (middle point) ==> 180
        setServoAngle(tilt, y_position) # 0 ==> 90 (middle point) ==> 180
    finally:
        # active = laser()
        # if active:
            # print('inside')
            # time.sleep(1)
        defaultPositionX(pan)
        defaultPositionY(tilt)
        # GPIO.cleanup()
        # print('Done!')
