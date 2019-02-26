def askForReplacementCost():
    replacementCost = float(input("Please enter replacement cost."
                                  + \ "your building"))#error
    return replacementCost

def calculateMinimumInsurance( replacementCost ):
    minimumInsurance = (80 / 100)  * replacementCost #error
    return minimumInsurance

def printInfo( replacementCost, minimumInsurance ):
    print("Final experts advise that you should insure your house for $", + #error \
          format( minimumInsurance, ".2f") + "because that's 80% of the "+ \
          " replacement cost of your building, which is $" +\
          format( minimumInsurance, ".2f")) #logic error


def main():
    replacementCost = askForReplacementCost()
    minimumInsurance = calculateMinimumInsurance( replacementCost )
    printInfo( replacementCost, minimumInsurance )

main()
