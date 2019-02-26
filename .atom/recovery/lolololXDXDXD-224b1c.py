total = 0
with open('steps.txt','r') as f:
    for i, line in enumerate(f):
        for i in range(31):
            print line
