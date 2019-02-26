import random

def generateRandomNumber():
    randomNumber = random.randint( 0,3 )
    return randomNumber
def getComputersChoice( randomNumber ):
    if randomNumber == 1:
        computerChoice = "Rock"
    elif randomNumber == 2:
        comupterChoice = "Paper"
    elif randomNumber == 3:
        computerChoice = "Scissors"

    return computerChoice

def getUserChoice():
    userChoice = input("Please enter your choice of Rock, Paper, or Scissors")
    return userChoice

def WinnerStatus( userChoice, computerChoice ):
    if computerChoice == "Rock" and userChoice == "Scissors":
        winner = "Computer"
        print("The Rock smashes the Scissors!")
    elif computerChoice == "Scissors" and userChoice == "Rock":
        winner = "You!"
        print("The Rock smashes the Scissors!")
    if computerChoice == "Scissors" and userChoice == "Paper":
        winner = "Computer"
        print("Scissors cuts Paper!")
    elif computerChoice == "Paper" and userChoice == "Scissors":
        winner = "You!"
        print("Scissors cuts Paper!")
    if computerChoice == "Rock" and userChoice == "Paper":
        winner = "Computer"
        print("Paper wraps Rock!")
    elif computerChoice == "Rock" and userChoice == "Paper":
              winner = "You!"
              print("Paper wraps Rock!")

print("Enter 0 to end the game".)
