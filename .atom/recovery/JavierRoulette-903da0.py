color = int(input('Enter the a pocket number in the range of 0 through 36: '))

color_number = color % 2

print()

if color == 0:
  print('The color is green.')
elif color > 0 and color <= 36:
  if color >= 1 and color <= 10:
    if color_number == 0:
      print('The color is black.')
    else:
      print('The color is red.')
  elif color >= 11 and color <= 18:
    if color_number == 0:
      print('The color is red.')
    else:
      print('The color is black.')
  elif color >= 19 and color <= 28:
    if color_number == 0:
      print('The color is black.')
    else:
      print('The color is red.')
  elif color >= 29 and color <= 36:
    if color_number == 0:
      print('The color is red.')
    else:
      print('The color is black.')
else:
  print('The number is outside the range of 0 through 36.')
