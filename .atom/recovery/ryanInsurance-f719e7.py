def calculateReplacementCost():
    replacementCost = float(input('Enter the replacement cost: '))
    return replacementCost

def calculateInsurance(replacementCost):
    insurance = replacementCost * .8
    return  insurance

def main():
    replacementCost = calculateReplacementCost()
    insurance = calculateInsurance(replacementCost)
    print('Your insurance is', insurance)

main()
