total = 0; january = 0; february = 28; march = 31; april = 30; may = 31; june = 30;
july = 31; august = 31; september = 30; october = 31; november = 30; december = 31
with open('steps.txt','r') as f:
    for i, line in enumerate(f):
        if i <= 30:
            january = january + float(line)
        elif i > 30 and i <= 58:
            february = february + float(line)
        elif i > 58 and i <= 89:
            march = march + float(line)
        elif i > 89 and i <= 119:
            april = april + float(line)
        elif i > 119  and i <= 150:
            may = may + float(line)
        elif i > 150 and i <= 180:
            june = june + float(line)
        elif i > 180 and i <= 211:
            july = july + float(line)
        elif i > 211 and i <= 242:
            august = august + float(line)
        elif i > 242 and i <= 272:
            september = september + float(line)
        elif i > 272 and i <= 303:
            october = october + float(line)
        elif i > 303 and i <= 333:
            november = november + float(line)
        elif i > 333 and i <= 364:
            december = december + float(line)
print january/31;print february/28;print march/31;print april/30;print may/31;print june/30;print july/31;print august/31;print september/30;print october/31;print november/30;print december/31
