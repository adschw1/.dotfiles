


month = ('January', 'February', 'March', 'April', 'May', 'June', 'July',
         'August', 'September', 'October', 'November', 'December')
days = (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
stepCounter = open('steps.txt', 'r')
# this sets the months to zero to begin tuple
monthCount = 0
for num in range(1, 13):
    totalSteps = 0
    count = 0
    average = 0
    for count in range(1, days[monthCount] + 1):
        steps = int(stepCounter.readline())
    totalSteps = totalSteps + steps
    average = totalSteps / days[monthCount]
    print ('The average steps taken for the month of ' + month[monthCount] +
    ' is: ' + format(average, ',.1f') + ' steps.')
    monthCount = monthCount + 1
main()
