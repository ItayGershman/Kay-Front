#!/usr/bin/env python

from Phidget22.Phidget import *
from Phidget22.Devices.RFID import *
#Required for sleep statement
import time

#Create
rfid = RFID()

#Open
rfid.openWaitForAttachment(1000)

#use your Phidgets
def getRFID():
    rfid_ID = None
    flag = True
    while(flag):
        if(rfid.getTagPresent()):
            flag = False
            rfid_ID = rfid.getLastTag()[0]
            print(rfid_ID)
        time.sleep(0.15)
    return rfid_ID

if __name__ == '__main__':
    position = getRFID()
    print 'position:', position
    # return position