def askForReplacementCost():

    replacementCost = float( input("Please enter the replacement cost of" + \

                                   "your building: " ))

    return replacementCost

def calculateMinimumInsurance(replacementCost):

    minimumInsurance = ( 80 / 100 ) * replacementCost

    return minimumInsurance

def printDetails(replacementCost, minimumInsurance):

    print()

    print("Financial experts advise that you should insure your house for $" + \

          format(minimumInsurance, ",.2f" ) + "because that's 80% of the replacement cost of your building, which is $"

          format (replacementCost, ",.2f"))

def main():

    replacementCost = askForReplacementCost()

    minimumInsurance = calculateMinimumInsurance(replacementCost)

    printDetails(replacementCost, minimumInsurance)

main()
