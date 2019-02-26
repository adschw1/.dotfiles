def askForReplacementCost():

    replacementCost = float(input("Please enter the replacement cost of your building: " ))

    return replacementCost

def calculateMinimumInsurance(replacementCost):

    minimumInsurance = 0.8 * float(replacementCost)

    return float(minimumInsurance)

def printDetails(replacementCost, minimumInsurance):

    print()

    print("Financial experts advise that you should insure your house for $" + str(minimumInsurance))
    print("because that's 80% of the replacement cost of your building, which is $" +str(replacementCost))

def main():

    replacementCost = askForReplacementCost()

    minimumInsurance = calculateMinimumInsurance(replacementCost)

    printDetails(replacementCost, minimumInsurance)

main()
