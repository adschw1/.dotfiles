def main():
    stepFile = open('steps.txt', 'r')
    Jan, Feb, Mar, April, May, June, July, Aug, Sep, Oct, Nov, Dec = days_of_month()
    total = 0
    print('Here is a summary of the avarage steps taken in each month:')
    steps_Jan(Jan, total, stepFile)
    steps_Feb(Feb, total, stepFile)
    steps_Mar(Mar, total, stepFile)
    steps_April(April, total, stepFile)
    steps_May(May, total, stepFile)
    steps_June(June, total, stepFile)
    steps_July(July, total, stepFile)
    steps_Aug(Aug, total, stepFile)
    steps_Sep(Sep, total, stepFile)
    steps_Oct(Oct, total, stepFile)
    steps_Nov(Nov, total, stepFile)
    steps_Dec(Dec, total, stepFile)
    stepFile.close()

#Defining the days in each month
def days_of_month():
    Jan = 31
    Feb = 28
    Mar = 31
    April = 30
    May = 31
    June = 30
    July = 31
    Aug = 31
    Sep = 30
    Oct = 31
    Nov = 30
    Dec = 31
    return Jan, Feb, Mar, April, May, June, July, Aug, Sep, Oct, Nov, Dec

#Calculating the average steps for each month
def steps_Jan(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('Janurary:', format(average, '.2f'), 'steps')

def steps_Feb(month, total, file):
    for count in (1, month +1):
        print (count)
        step = int(file.readline())
        total += step
    average = total/month
    print('Feburary:', format(average, '.2f'), 'steps')

def steps_Mar(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('March:', format(average, '.2f'), 'steps')

def steps_April(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('April:', format(average, '.2f'), 'steps')

def steps_May(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('May:', format(average, '.2f'), 'steps')

def steps_June(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('June:', format(average, '.2f'), 'steps')

def steps_July(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('July:', format(average, '.2f'), 'steps')

def steps_Aug(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('August:', format(average, '.2f'), 'steps')

def steps_Sep(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('September:', format(average, '.2f'), 'steps')

def steps_Oct(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('October:', format(average, '.2f'), 'steps')

def steps_Nov(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('November:', format(average, '.2f'), 'steps')

def steps_Dec(month, total, file):
    for count in (1, month +1):
        step = int(file.readline())
        total += step
    average = total/month
    print('December:', format(average, '.2f'), 'steps')

#Calling the main() function
main()
