useBudget = float(input("Please enter how much you've budgeted" + \
                        "for the month: "))

moreExpenses = "y"
userTotalExpenses = 0

while moreExpenses == "y":
    userExpense = float(input("Enter an expense: "))
    userTotalExpenses += userExpense
    moreExpenses = input("Do you have more expense?: Type y " + \
                         "for yes, any key for no: ")

print()
if userTotalExpenses > userBudget:
    print("You were over your budget of","$" + format(userBudget, ",.2f") \
          'by', "$" + format(userTotalExpenses - userBudget, ",.2f"))
elif userBudget > userTotalExpenses:
    print("You were under your budget of", "$" + format(userBudget, ",.2f"), \
          "by", "$" + format(userBudget - userTotalExpenses, ",.2f"))
else:
    print("You used exactly your budget of", \
          "$" + format(userBudget , ",.2f"),".")
