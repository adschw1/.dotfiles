userPocketNumber = int(input("Enter your Pocket Number: "))

if userPocketNumber < 0 or userPocketNumber > 36:
    print("Enter a number from 0 to 36")
else:
    if userPocketNumber == 0:
        print("The Pocket is green")
    elif userPocketNumber < 11:
        if userPocketNumber % 2 != 0:
            print("The Pocket is red")
        elif userPocketNumber % 2 == 0:
            print("The Pocket is black")
        elif userPocketNumber <19:
            if userPocketNumber % 2 != 0:
                print("The Pocket is black")
            elif userPocketNumber % 2 == 0:
                print("The Pocket is Red")
        elif userPocketNumber < 29:
            if userPocketNumberm % 2 == 0:
                print("THe Pocket is Red")
            elif userPocketNumber % 2 == 0:
                print("The Pocket is Black")
        else:
            if userPocketNumber % 2 != 0:
                print("The Pocket is Black")
            elif userPocketNumber % 2 == 0:
                print("The Pocket is Red")
