# This script basically opens a bunch of Tmux sessions at once
# Very handy when accessing many devices at the same time

import subprocess

print('This script will ask you for:','session name,','# of windows,','window prefix,','and window suffix.')
session_name = str(input("Name: "))
windows = int(input("# of windows: "))
prefix = str(input("Window prefix: "))
suffix = int(input("Starting # of suffix: "))
first_prefix = str(prefix)
command = ["tmux","new-session","-d","-s",session_name,"-n",first_prefix]
subprocess.call(command)
subprocess.call(["tmux","renamew","-t",first_prefix,(str(prefix)+str(suffix))])
for i in range(2,windows+1):
    suffix+=1
    prefix_ = (str(prefix) + str(suffix))
    subprocess.call(["tmux","neww","-n",prefix_])

subprocess.call(["tmux","attach","-t",session_name])
