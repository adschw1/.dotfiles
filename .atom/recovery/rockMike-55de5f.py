import random

def generateRandomNumber():
    randomNumber = random.randint(1, 3)
    return randomNumber
def getComputerChoice(randomNumber):
    if randomNumber == 1:
        computerChoice = "rock"
    elif randomNumber == 2:
        computerChoice = "paper"
    elif randomNumber == 3:
        computerChoice = "scissors"

    return computerChoice
def getUserChoice():
    userChoice = input("Please Enter your choice:")
    return userChoice
def determineWinner( computerChoice, userChoice ):
    rockMessage = "Rock beats Scissors"
    scissorMessage = "Sissors beats paper"
    paperMessage = "Paper beats Rock"
    winner = "no winner"
    message = ""

    if computerChoice == "rock" and userChoice == "scissors":
        winner = "Computer"
        message = rockMessage
    elif computerChoice == "scissors" and userChoice == "rock":
        winner = "You"
        message = rockMessage

    if computerChoice == "scissors" and userChoice == "paper":
        winner = "Computer"
        message = scissorMessage
    elif computerChoice == "paper" and userChoice == "rock":
        winner = "You"
        message = scissorMessage

    if computerChoice == "paper" and userChoice == "rock":
        winner = "Computer"
        message = paperMessage
    elif computerChoice == "rock" and userChoice == "paper":
        winner = "You"
        message = paperMessage

    return winner, message

def startAgain():
    randomNumber = generateRandomNumber()
    computerChoice = getComputerChoice(randomNumber)
    userChoice = getUserChoice()
    print("The computer chose", computerChoice)
    winner, message = determineWinner( computerChoice, userChoice)

    if winner != "no winner":
        print( winner, "won(", message, ")")

        return winner

    while winner == "no winner":
        print("You both picked the same thing")
        winner = startAgain()


main()
