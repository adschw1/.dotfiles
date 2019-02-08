import subprocess

session_name = raw_input("Name: ")
windows = int(raw_input("# of windows: "))
prefix = raw_input("Window prefix: ")
suffix = int(raw_input("Starting # of suffix: "))
first_prefix = str(prefix)
command = ["tmux","new-session","-d","-s",session_name,"-n",first_prefix]
subprocess.call(command)
subprocess.call(["tmux","renamew","-t",first_prefix,(str(prefix)+str(suffix))])
for i in range(2,windows+1):
    suffix+=1
    prefix_ = (str(prefix) + str(suffix))
    subprocess.call(["tmux","neww","-n",prefix_])


subprocess.call(["tmux","attach","-t",session_name])
