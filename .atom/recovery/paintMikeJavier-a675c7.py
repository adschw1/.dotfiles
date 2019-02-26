def askForWallSpace():
    userWallSpace = float(input("Enter the wall space in square feet"))

    print()
    return userWallSpace

def askForPriceofPaint():
    priceOfPaint = float(input("Enter the price of the paint"))
    print()
    return priceOfPaint
def calculatePaintRequired(userWallSpace):
    paintRequired = (userWallSpace / 112) * 1
    return paintRequired
def calculateHoursOfLaborRequired(userWallSpace):
    hoursRequired = (userWallSpace / 112) * 8
    return hoursRequired
def calculateCostOfPaint(priceOfPaint, gallonsOfPaintRequired):
    costOfPaint = gallonsOfPaintRequired * priceOfPaint
    return costOfPaint
def calculateLaborCharges(hoursOfLaborRequired):
    Charge_Per_Hour = 35
    laborCharges = hoursOfLaborRequired * Charge_Per_Hour
    return laborCharges
def calculateTotalCostOfJob(laborCharges, costOfPaint):
    totalCost = laborCharges + costOfPaint
    return totalCost
def paintBill(paintRequired, hoursRequired, costOfPaint, laborCharges, totalCost):
    print("Paint required: " + format(paintRequired, ".2f"),
          "Hours of labor required: " + format(hoursRequired, ".2f"),
          "Cost of paint: " + format (costOfPaint, ".2f"),
          "Labor charges: " + format (laborCharges, ".2f"),
          "Total Cost: $" + format (totalCost, ".2f"))
def main():
    userWallSpace = askForWallSpace()
    priceOfpaint = asForPriceOfPaint()
    paintRequired = calculatePaintRequired(userWallSpace)
    hourRequired = calulateHoursOfLaborRequired(userWallSpace)
    costOfPaint = calulateCostOfPaint(priceOfPaint, paintRequired)
    laborCharges = calulateLaborChargers(hoursRequired)
    totalCost = calulateTotalCostOfPaintJob(laborCharges, costOfPaint)
    printBull(paintRequired, hoursRequired, costOfPaint, laborCharges, totalCost)

if __name__ == '__main__':
    main()
