def sqFt():
    sqFt = float(input("Enter square feet of wall space: "))
    return sqFt

def amountPaint(sqFt):
    return sqFt/112

def laborCharges(amountPaint):
    laborCharges = amountPaint*8

def paintPrice():
    paintPrice = float(input("Enter price of paint per gallon: "))
    return paintPrice

def calculateFinaltotal(laborCharges,paintPrice):
    finalTotal = (laborCharges + paintPrice)
    print(finalTotal)

def output(sqFt, amountPaint, laborCharges, paintPrice, calculateFinaltotal):
    print("Square feet is: ", sqFt)
    print("Amount of paint is: ", amountPaint)
    print("Labor charges are $", laborCharges)
    print("Paint price is $", paintPrice)
    print("Your final total is $", calculateFinaltotal)

def main():
    sqFt = sqFt()
    amountPaint = amountPaint(sqFt)
    laborCharges = laborCharges(amountPaint)
    paintPrice = paintPrice()
    calculateFinaltotal = calculateFinaltotal(laborCharges,paintPrice)
    
main()
