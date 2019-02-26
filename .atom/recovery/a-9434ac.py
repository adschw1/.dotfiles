def main():

    text_file = open(for_exercise4.txt, 'r')
    read_file = text_file.read()
    word_list = read_file.split()
    uniquewords = set(word_list)
    print(uniquewords)

main()
