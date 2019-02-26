def unique_file(input_filename):
    input_file = open(text.txt, 'r')
    file_contents = input_file.read()
    input_file.close()
    word_list = file_contents.split()

    unique_words = set(word_list)
    for word in unique_words:
        file.write(str(word) + "\n")
    
    file.close()
