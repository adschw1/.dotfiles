#Make a Magic 8 ball
import random
answers = ['Yes of course', 'You can count on it', 'Without a doubt', 'Ask me later', 'Im not sure', 'I cant tell you right now', 'I will tell you after my nap', 'No way!', 'I dont think so.', 'Without a doubt, no.', 'The answer is clearly NO.']
print('I am the Magic 8 Ball')
name = input()
print('hello ' + name)
def Magic8Ball():
    print('Ask me a question.')
    input()
    print (answers[random.randint(0, len(answers)-1)] )
    print('I hope that helped!')
    Replay()
def Replay():
    print ('Do you have another question? [Y/N] ')
    reply = input()
    if reply == 'Y':
        Magic8Ball()
    elif reply == 'N':
        exit()
    else:
        print('I apologies, I did not catch that. Please repeat.')
        Replay()
def main():
    Magic8Ball()
    Replay()

if __name__ == '__main__':
    main()
