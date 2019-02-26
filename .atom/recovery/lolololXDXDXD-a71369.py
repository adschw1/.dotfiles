total = 0
with open('steps.txt','r') as f:
    for line in f:
        total = total + float(line)
print(total/365)
