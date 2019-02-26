def sqFt():
    sqFt = float(input("Enter square feet of wall space: "))
    return sqFt

def amountPaint(sqFt):
    return sqFt/112.0

def laborCharges(amountPaint):
    laborCharges = amountPaint*8.0
    return laborCharges

def paintPrice():
    paintPrice1 = float(input("Enter price of palint per gallon: "))
    return paintPrice1

def calculateFinaltotal(labor_Charges, paint_Price):
    print (type(labor_Charges), type(paint_Price))
    final_Total = (labor_Charges + paint_Price)
    return(final_Total)

def output(squareFeet, amount_of_Paint, labor_Charges, paint_Price, finalTotal):
    print("Square feet is: ", squareFeet)
    print("Amount of paint is: ", amount_of_Paint)
    print("Labor charges are $", labor_Charges)
    print("Paint price is $", paint_Price)
    print("Your final total is $", finalTotal)

def main():
    squareFeet = sqFt()
    amount_of_Paint = amountPaint(squareFeet)
    labor_Charges = laborCharges(amount_of_Paint)
    paint_Price = paintPrice()
    finalTotal = calculateFinaltotal(labor_Charges, paint_Price)
    output(squareFeet, amount_of_Paint, labor_Charges, paint_Price, finalTotal)

main()
