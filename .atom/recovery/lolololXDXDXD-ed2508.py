total = 0
with open('steps.txt','r') as f:
    for i in f:
        for x in range(i):
            print x
    # for line in f:
    #     total = total + float(line)
