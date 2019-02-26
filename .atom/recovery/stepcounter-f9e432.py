#JOSH SPACHT


def main():
    steps_file = open('steps.txt', 'r')
    day = 0
    step_count= 0
    while day<=364:
        step_count += int(steps_file.readline())
        day += 1
        if day == 31:
            print("January's step count: ", step_count)
            step_count = 0
        if day == 59:
            print("February's step count: ", step_count)
            step_count = 0
        if day == 90:
            print("March's step count: ", step_count)
            step_count = 0
        if day == 120:
            print("April's step count: ", step_count)
            step_count = 0
        if day == 151:
            print("May's step count: ", step_count)
            step_count = 0
        if day == 181:
            print("June's step count: ", step_count)
            step_count = 0
        if day == 212:
            print("July's step count: ", step_count)
            step_count = 0
        if day == 243:
            print("August's step count: ", step_count)
            step_count = 0
        if day == 273:
            print("September's step count: ", step_count)
            step_count = 0
        if day == 304:
            print("October's step count: ", step_count)
            step_count = 0
        if day == 334:
            print("November's step count: ", step_count)
            step_count = 0
        if day == 365:
            print("December's step count: ", step_count)
            step_count = 0
    steps_file.close()
main()
