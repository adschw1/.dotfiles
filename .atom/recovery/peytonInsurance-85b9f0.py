def calculateReplacementCost():
    replacementCost = float(input('Enter the replacement cost of the building: '))
    replacementCost = replacementCost - (replacementCost * 0.80)
    return replacementCost

def main():
    replacementCost = calculateReplacementCost()
    print('Here is the minimum amount of insurance for the property: ', replacementCost)
    
main()
