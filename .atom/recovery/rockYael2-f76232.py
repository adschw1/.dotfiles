from random import randint
t= [1,2,3]
computer= t[randint(0,2)]


player = int(input("Rock (1), Paper (2), Scissors(3)? or 0 to exit"))
        if computer==player:
                print("Tie!")
        elif player == 1:
            if computer == 2:
                print("You lose!")
            else:
                print("You win!")
        elif player == 2:
            if computer == 3:
                print("You lose!")
            else:
                print("You win!")
        elif player == 3:
            if computer == 1:
                print("You lose!")
            else:
                print("You win!")
        elif player == 0:
                print("Goodbye")
        else:
                print("That's not a valid play. Type 1,2,3, or 0") 

player = False

