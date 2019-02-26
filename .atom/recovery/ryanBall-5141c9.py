import random

def main():
    answers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    input_file = open('8_ball_responses.txt', 'r')
T    question = input('Ask the magic 8 ball a question: ')
    while question == ' ?':
        answer = random.randint(1, 12)
        return answer
        print(answer)
    input_file.close()

main()
