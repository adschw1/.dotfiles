import pygame

pygame.init()

#Screen Size
width = 800
height = 800
title = "Crossy RPG"
#Screen Color
black = (0,0,0)
white = (255,255,255)

#Clock variable and TICK_RATE
clock = pygame.time.Clock()
TICK_RATE = 60
is_game_over = False

screen = pygame.display.set_mode((width, height))

screen.fill(white)
pygame.display.set_caption(title)

player_image = pygame.image.load('player.png')
player_image = pygame.transform.scale(player_image)


#Game runs while is_game_over is not True
while not is_game_over:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            is_game_over = True
        print(event)
    pygame.display.update()
    clock.tick(TICK_RATE)
    pygame.draw.rect(screen, black, [350, 350, 100, 100])
    pygame.draw.circle(screen, black, (400, 300), 50)

pygame.quit()
quit()
