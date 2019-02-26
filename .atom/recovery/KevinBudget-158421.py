userBudget = float(input("PLease enter monthly budget: "))
moreExpenses = "y"
noMoreExpenses = "n"
userTotalExpenses = 0
while moreExpenses == "y":
    noMoreExpenses == "n"
    userExpense = float(input("Enter a expense: "))
    userTotalExpenses = userTotalExpenses + userExpense
    moreExpenses = input( "Do you have more expenses?: Type y for yes, n for no:")
if userTotalExpenses > userBudget:
    print( "You were over your budget of", "$", userBudget, "by","$",userTotalExpenses - userBudget)
elif userBudget > userTotalExpenses:
    print(" You were under your budget of","$",userBudget,"by","$",userBudget - userTotalExpenses)
else:
    print(" You used exactly your budget of","$",userBudget,".")
