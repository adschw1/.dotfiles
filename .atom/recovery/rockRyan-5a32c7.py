import random

def getNum():
    num1 = random.randint(1, 3)
    return num1

def displayComChoice(num1):
    print(num1 , " = ")

def getUserChoice():
    userchoice = int(input())
    return userchoice

def checkChoice(userchoice, num1):
    if userchoice >= num1 or userchoice <= num1:
        print("You have won!")
    else:
        print("You have lost!")

def main():
    count = 0
    while count < 10:
        num1 = getNum()
        displayComChoice(num1)
        userchoice = getUserChoice()
        checkChoice(userchoice, num1)
        count += 1

main()
