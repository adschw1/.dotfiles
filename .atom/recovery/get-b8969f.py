'''
Andrew Schwenk
get.py - pick the path of least resistance
IT 379
March 7th, 2019
'''

import subprocess as s
from pythonping import ping
file1='https://chi.uc.chameleoncloud.org:7480/swift/v1/Lab6_adschw1/170804_A_Lombok_024.mp4'
file2='https://chi.uc.chameleoncloud.org:7480/swift/v1/Lab6_adschw1/TonyRobbins_2006-480p.mp4'
file3='https://chi.tacc.chameleoncloud.org:7480/swift/v1/Lab6_adschw1/170804_A_Lombok_024.mp4'
file4='https://chi.tacc.chameleoncloud.org:7480/swift/v1/Lab6_adschw1/TonyRobbins_2006-480p.mp4'
chi_uc='chi.uc.chameleoncloud.org'
chi_tacc='chi.tacc.chameleoncloud.org'

def checkDelay():
    uc_resp = ping(chi_uc,size=0,count=10)
    tacc_resp = ping(chi_tacc,size=0,count=10)
    print(uc_resp.rtt_avg_ms)
    print(tacc_resp.rtt_avg_ms)

def main():
    checkDelay()

if __name__ == '__main__':
    main()
