def getsquare_feet():
    square_feet = int(input('Enter the square feet of wall space to be painted: '))
    return square_feet

def getgallons_of_paint(square_feet):
    gallons_of_paint = square_feet / 112
    return gallons_of_paint

def getcost_of_paint(gallons_of_paint):
    cost_of_paint = int(input('Enter the total cost of paint: '))
    cost_of_paint = cost_of_paint * gallons_of_paint
    return cost_of_paint

def getlabor_hours(gallons_of_paint):
    labor_hours = gallons_of_paint * 8
    return labor_hours

def getlabor_charges(labor_hours):
    labor_charges = 35 * labor_hours
    return labor_charges

def gettotal(gallons_of_paint, labor_hours, cost_of_paint, labor_charges):
    print('The number of gallons of paint required: ', gallons_of_paint)
    print('The hours of labor required: ', labor_hours)
    print('The cost of paint: ', cost_of_paint)
    print('The labor charges: ', labor_charges)
    print('The total cost of the paint job: ', labor_charges + cost_of_paint)

def main():
    square_feet = 0
    labor_hours = 8
    cost_of_paint = 0
    labor_charges = 0
    gallons_of_paint = 0
    total = 0
    square_feet = getsquare_feet()
    cost_of_paint = getcost_of_paint(gallons_of_paint)
    gallons_of_paint = getgallons_of_paint(square_feet)
    labor_hours = getlabor_hours(gallons_of_paint)
    labor_charges = getlabor_charges(labor_hours)
    gettotal(gallons_of_paint, labor_hours, cost_of_paint, labor_charges)
main()


#We have discussed with you and still have trouble.
