#Importing software to make options randomized
from random import randint

#the three options
options = ["Rock", "Paper", "Scissors"]

#assigning options to the computer
computer = options[randint(0,2)]

#setting player to False so we can make a play
player = False

while player == False:
#setting player to True so we can play against the computer
    player = input("Rock, Paper, Scissors? ")
    if player == computer:
        print("It's a tie!")
    elif player == "Rock":
        if computer == "Paper":
            print("You lose;", computer, "covers", player)
        else:
            print("You win;", player, "smashes", computer)
    elif player == "Paper":
        if computer == "Scissors":
            print("You lose;", computer, "cut", player)
        else:
            print("You win;", player, "covers", computer)
    elif player == "Scissors":
        if computer == "Rock":
            print("You lose;", computer, "smashes", player)
        else:
            print("You win;", player, "cut", computer)
    elif player == "0":
        print("Thanks for playing the game!")
        break
    else:
        print("That's not a valid play.")

    #player was set to True when it input an option, but we want it to be False so we can keep playing
    player = False
    computer = options[randint(0,2)]
