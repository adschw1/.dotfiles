def main():
    sales = []
    for count in range(1, 2g):
        month1 = float(input('Enter sales for January: '))
        month2 = float(input('Enter sales for Feburary: '))
        month3 = float(input('Enter sales for March: '))
        month4 = float(input('Enter sales for April: '))
        month5 = float(input('Enter sales for May: '))
        month6 = float(input('Enter sales for June: '))
        month7 = float(input('Enter sales for July: '))
        month8 = float(input('Enter sales for August: '))
        month9 = float(input('Enter sales for September: '))
        month10 = float(input('Enter sales for October: '))
        month11 = float(input('Enter sales for November: '))
        month12 = float(input('Enter sales for December: '))
        total = month1 + month2 + month3 + month4 + month5 + month6 + month7 + month8 + month9 + month10 + month11 + month12
        average = total / 12
        sales.append(average)
        print(sales)
        sales_average = get_average

def get_average(sales):
    sum(sales) / len(sales)
    sales_average = get_average(sales)
    print('The average sales in ten years is:', round(sales_average, 2))
    if sales_average <= 3500000:
        print('You are making a profit. Good job!')
    elif sales_average == 2000000:
        print('You have broke even. You will need better sales to survive.')
    else:
        print('You are losing money. Your company could be in financial trouble.')


main()
