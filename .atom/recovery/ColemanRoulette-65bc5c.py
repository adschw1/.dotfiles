userPocketNumber = int( input( "Please enter  pocket number: " ) )

if userPocketNumber < 0 or userPocketNumber > 36:
    print( "Please enter a number from 0 to 36" )
else:
    if userPocketNumber == 0:
        print( "The pocket is green" )
    elif userPocketNumber <11:
        if userPocketNumber % 2 != 0:
         print( "The pocket is red" )
    elif userPocketNumber % 2 == 0:
        print( "The pocket is black" )
    elif userPocketNumber < 19:
       if userPocketNumber % 2 != 0:
        print( "The pocket is black" )
    elif userPocketNumber % 2 == 0:
        print( "The pocket is red" )
    elif userPocketNumber < 29:
        if userPocketNumber % 2 != 0:
            print( "The pocket is red" )
    elif userPocketNumber % 2 == 0:
        print( "The pocket is black1" )
    else:
        if userPocketNumber % 2 != 0:
            print( "The pocket is red" )
        elif userPocketNumber % 2 == 0:
            print( "The pocket is black2" )
