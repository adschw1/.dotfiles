import random

def main():
    infile = open('8_ball_responses.txt', 'r')
    answers = infile.readlines()
    userQ = input("Ask the Magic 8 Ball your question. Enter 'quit' to quit playing.\n")
    while userQ == (''):

    if userQ == ("quit"):
        print("Okay, bye.")
    else:
        print(random.choice(answers))

main()