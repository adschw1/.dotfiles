budget = input("please enter the budget amount for given month\n ")
sum_ = 0
expense = 0
x = 0

print("Please enter the expenses for the given month:")
while (1):
    expense1 = input("Please enter expense number " + str(x + 1) + " \n")
    sum_ = sum_ + int(expense)
    c = input("If you want to enter more expense press y else n \n")
    if c == 'y':
        x += 1
        continue
    else:
        break
    if sum_ > budget:
        print("You went over budget")
    else:
        print("You are under budget")
