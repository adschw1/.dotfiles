total = 0; january = 0
with open('steps.txt','r') as f:
    for i, line in enumerate(f):
        if i >= 30:
            january = january + line
            print(january/31)
