def replacementCostPrompt():
    replacementCost = float(input("What is the cost of replacement: "))
    return replacementCost

def calculateInsurance(replacementCost):
    insurance = (80/100) * replacementCost
    return insurance

def printDetails(replacementCost, insurance):
    print("The insurance should cover" , (insurance))

def main():
    replacementCost = replacementCostPrompt
    insurance = calculateInsurance(replacementCost)
    printDetails(replacementCost, insurance)

main()
