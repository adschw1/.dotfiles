#setup
import turtle
turtle.showturtle()
turtle.setup(500,500)
turtle.bgcolor("black")
turtle.pencolor("white")
turtle.pensize(2)
turtle.penup()
turtle.goto(-50, 220)
turtle.write("Orion Constellation by Japher")

#Betelgeuse
turtle.goto(-70,200)
turtle.dot()
turtle.write("Betelgeuse")

#Alnitak
turtle.pendown()
turtle.goto(-40,-20)
turtle.dot()
turtle.write("Alnitak")

#Saiph
turtle.goto(-90,-180)
turtle.dot()
turtle.write("Saiph")

#Alnilam
turtle.penup()
turtle.goto(-40,-20)
turtle.pendown()
turtle.goto(0,0)
turtle.dot()
turtle.write("Alnilam")

#Mintaka
turtle.goto(40,20)
turtle.dot()
turtle.write("Mintaka")

#Rigel
turtle.goto(120,-140)
turtle.dot()
turtle.write("Rigel")

#Meissa
turtle.penup()
turtle.goto(80,180)
turtle.dot()
turtle.write("Meissa")
turtle.pendown()
turtle.goto(40,20)
turtle.hideturtle()
