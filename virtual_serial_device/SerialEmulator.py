import os, subprocess, time, serial

class SerialEmulator(object):
    def __init__(self, device_port='./ttydevice', client_port='./ttyclient'):
        self.device_port = device_port
        self.client_port = client_port
        cmd=['socat','-d','-d','PTY,link=%s,raw,echo=0' %
                self.device_port, 'PTY,link=%s,raw,echo=0' % self.client_port]
        self.proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        time.sleep(1)
        self.serial = serial.Serial(self.device_port, 9600, rtscts=True, dsrdtr=True)
        self.err = ''
        self.out = ''

    def write(self, out):
        self.serial.write(out)

    def read(self):
        line = ''
        while self.serial.inWaiting() > 0:
            line += self.serial.read(1)
        print line

    def __del__(self):
        self.stop()

    def stop(self):
        self.proc.kill()
        self.out, self.err = self.proc.communicate()


        