import random
import time
input_file = open('8_ball_responses.txt', 'r')
responses = input_file.readlines()
question = input("Please ask me a Yes/No question.")
time.sleep(3)
print(random.choice(responses))
while True:
    inp = raw_input()
    if inp == "quit":
        break
