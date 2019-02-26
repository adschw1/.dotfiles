import random

def main():
    randomNumber = generateRandomNumber()
    computerChoice = getComputerChoice(randomNumber)
    userChoice = getUserChoice()
    print( "The computer chose", computerChoice )
    winner, message = determineWinner(computerChoice, userChoice)
    print(winner,"is the winner.", message)

def generateRandomNumber():
    randomNumber = random.randint(1,3)
    return randomNumber

def getComputerChoice(randomNumber):
    if randomNumber == 1:
        comp = "rock"
    elif randomNumber == 2:
        comp = "paper"
    elif randomNumber == 3:
        comp = "scissors"
    return comp

def getUserChoice():
    userChoice = int(input("Enter your choice 1 for rock, 2 for paper, 3 for scissors, and 0 to quit: "))
    if userChoice == 0:
        pass
    elif userChoice == 1:
        userChoice = 'rock'
    elif userChoice == 2:
        userChoice = 'paper'
    elif userChoice == 3:
        userChoice = 'scissors'
    return userChoice

def determineWinner(computerChoice, userChoice):
    rockMessage = "Rock obliterates scissors."
    scissorsMessage = "Scissors slash paper."
    paperMessage = "Paper silences rock."
    winner = "No one"
    message = " "

    if computerChoice == "rock" and userChoice == "scissors":
        winner = "Computer"
        message = rockMessage
    elif computerChoice == "scissors" and userChoice == "rock":
        winner = "User"
        message = rockMessage

    if computerChoice == "scissors" and userChoice == "paper":
        winner = "Computer"
        message = scissorsMessage
    elif computerChoice == "paper" and userChoice == "scissors":
        winner = "User"
        message = scissorsMessage

    if computerChoice == "paper" and userChoice == "rock":
        winner = "Computer"
        message = paperMessage
    elif computerChoice == "rock" and userChoice == "paper":
        winner = "User"
        message = paperMessage

    return winner, message

# def startAgain():
#     randomNumber = generateRandomNumber()
#     computerChoice = getComputerChoice(randomNumber)
#     userChoice = getUserChoice()
#     print( "The computer chose", computerChoice )
#     winner, message = determineWinner( computerChoice, userChoice)
#     if winner != "no winner":
#         print( winner, "won(", message, ")")
#     return winner


main()