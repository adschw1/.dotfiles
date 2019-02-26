expense = 0.0
budget = 0.0
difference = 0.0
expenseTotal = 0.0

total_expense = 0
keep_going = 'y' or 'yes' or 'Yes' or 'YES'



budget = float(input("What is your budget for the month?"))
print("Please begin entering the amounts of each of your monthly expenses:")

while keep_going == 'y' or 'yes' or 'Yes' or 'YES':
    expense = float(input("Monthly expense amount? $"))
    total_expense = total_expense + expense
    keep_going = input("Do you have any other expenses? ")
    print (keep_going)
if expense < budget:
    difference = budget - expense
    print("You were $", difference, " under budget.")

elif expense > budget:
    difference = expense - budget
    print("You were $", difference, " over budget.")

else:
    print("You were right on budget. Great Job!!!")


input("Press enter to exit.")
