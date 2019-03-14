'''
Andrew Schwenk
get.py - pick the path of least resistance
IT 379
March 7th, 2019
'''

import subprocess as s
from pythonping import ping as p

file1='https://chi.uc.chameleoncloud.org:7480/swift/v1/Lab6_adschw1/170804_A_Lombok_024.mp4'
file2='https://chi.uc.chameleoncloud.org:7480/swift/v1/Lab6_adschw1/TonyRobbins_2006-480p.mp4'
file3='https://chi.tacc.chameleoncloud.org:7480/swift/v1/Lab6_adschw1/170804_A_Lombok_024.mp4'
file4='https://chi.tacc.chameleoncloud.org:7480/swift/v1/Lab6_adschw1/TonyRobbins_2006-480p.mp4'
chi_uc='chi.uc.chameleoncloud.org'
chi_tacc='chi.tacc.chameleoncloud.org'

class CheckDelay():
    uc_resp = p(chi_uc,)
    tacc_resp = p(chi_tacc,)
