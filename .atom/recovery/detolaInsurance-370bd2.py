def main():
    # Ask for the replacement cost of the insured building.
    replacement_cost = input('Enter the replacement cost of the building: ')
    replace(replacement_cost)

def replace(replacement_cost):
    # Find what 80% of the value is.
    insurance_value = replacement_cost * 0.8

    # State what the minimum insurance needed is.
    print ('The minimum amount of insurance you need is $%.2f' % insurance_value, ' dollars.')


# Call the main function.
main()
