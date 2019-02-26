#rock paper scissors
D = [ "Rock", "Paper" , "Scissors"]
computer = d[randint(0,3)]
#set player to false
player = false
while player == false:
#set player to true
    player = input ("Rock, Paper, Scissors?")
    if player == computer:
        print("tie")
     elif player == "Rock":
        if computer == "Paper":
     print("you lose", computer, "covers", player)
     else:
            print("You win", player, "smashes", computer)
        elif player == "Paper":
    if computer == "Scissors":
            print("You lose", computer, "cut", player)
        else:
            print("You win", player, "covers", computer)
        elif player == "Scissors":
        if computer == "Rock":
            print("You lose...", computer, "smashes", player)
        else:
                print("You win", player, "cut", computer)
    #player was set to True, but we want it to be False so the loop continues
    player = False
    computer = t[randint(0,3)]

