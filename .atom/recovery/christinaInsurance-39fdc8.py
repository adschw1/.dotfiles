def askForReplacementCost():
    replacementCost = float(input("Please enter replacement cost."
                                  +  "your building: "))
    return replacementCost

def calculateMinimumInsurance( replacementCost ):
    minimumInsurance = (80 / 100)  * replacementCost
    print(minimumInsurance)
    return minimumInsurance

def printInfo( replacementCost, minimumInsurance ):
    print("Final experts advise that you should insure your house for $" +\
          format( minimumInsurance, ".2f") + "because that's 80% of the "+\
          " replacement cost of your building, which is $" +\
          format( minimumInsurance, ".2f"))


def main():
    replacementCost = askForReplacementCost()
    minimumInsurance = calculateMinimumInsurance( replacementCost )
    printInfo( replacementCost, minimumInsurance )

main()
