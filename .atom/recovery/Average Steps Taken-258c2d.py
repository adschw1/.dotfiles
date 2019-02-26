month = ('January', 'February', 'March', 'April', 'May', 'June', 'July',
         'August', 'September', 'October', 'November', 'December')
days = (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)

def main():
    welcome()
    stepTracker()

def welcome():
    print ('Here is your workout information for the year:')
    print ('__________________________________________________________________')
    print ('')

def stepTracker():
    stepCounter = open('steps.rtf', 'r')
    countMonth = 0
    for num in range(1, 13):
        totalSteps = 0
        count = 0
        average = 0
        for count in range(1, days[countMonth] + 1):
            steps = int(stepCounter.readline())
            totalSteps = totalSteps + steps
        average = totalSteps / days[countMonth]
        print ('The average steps taken for the month of ' + month[countMonth] +
               ' is: ' + format(average, ',.1f') + ' steps.')
        countMonth = countMonth + 1
main()

# I am having trouble opening the text file!
