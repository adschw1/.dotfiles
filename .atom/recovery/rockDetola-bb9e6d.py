#random not imported
#rock paper scissors
D = [ "Rock", "Paper" , "Scissors"]
computer = d[randint(0,3)] #error
#set player to false
player = false #error
while player == false: #error
#set player to true
    player = input ("Rock, Paper, Scissors?")
    if player == computer:
        print("tie")
    elif player == "Rock": #indent error
        if computer == "Paper":
            print("you lose", computer, "covers", player) #indent error
        else: #indent error
                print("You win", player, "smashes", computer) #indent error
    elif player == "Paper": #indent error
        if computer == "Scissors": #indent error
                print("You lose", computer, "cut", player)#indent error
        else:#indent error
            print("You win", player, "covers", computer)#indent error
    elif player == "Scissors":#indent error
        if computer == "Rock":#indent error
            print("You lose...", computer, "smashes", player)#indent error
        else:#indent error
                    print("You win", player, "cut", computer)
        #player was set to True, but we want it to be False so the loop continues
    player = False
    computer = t[randint(0,3)] #error
