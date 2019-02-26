import random

def main():
    infile = open('8_ball_responses.txt', 'r')

userQ = input("Ask the Magic 8 Ball your question. Enter 'quit' to quit playing.\n")

while userQ == (''):
    print(random.choice('8_ball_responses.txt'))
if userQ == ("quit"):
    print("Okay, bye.")
else:
    print(random.choice('8_ball_responses.txt'))

main()
