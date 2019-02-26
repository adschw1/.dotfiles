days = [31,28,31,30,31,30,31,31,30,31,30,31]

months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

firstIndex = 0

lastIndex = 0

 

inputFile = open(r'steps.txt', 'r')

outputFile = open(r'steps.txt', 'w')

 

outputFile.write('MONTH | AVERAGE\n')

print('MONTH | AVERAGE\n')

lines = inputFile.readlines()

lines = list(map(int,lines))

 

for x in range(0, 12):

    lastIndex = firstIndex + days[x]

    monthLines = lines[firstIndex:lastIndex]

    average = float(sum(monthLines)) / max(len(monthLines),1)

    outputFile.write(months[x] + '|' + '{0:.1f}'.format(average)+ '\n')

    firstIndex = lastIndex

 

inputFile.close()

outputFile.close()
