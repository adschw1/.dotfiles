import pygame

title = "Crossy RPG"
width = 800
height = 800
black = (0,0,0)
white = (255,255,255)
clock = pygame.time.Clock()
pygame.font.init()
font = pygame.font.SysFont('comicsans', 75)

class Game:
    TICK_RATE = 60

    def __init__(self, title, width, height):
        self.title = title
        self.width = width
        self.height = height
        self.screen = pygame.display.set_mode((width, height))
        self.screen.fill(white)
        pygame.display.set_caption(title)

    def run_game_loop(self):
        is_game_over = False
        while not is_game_over:

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    is_game_over = True
                print(event)


            pygame.display.update()
            clock.tick(self.TICK_RATE)
            # screen.blit(player_image, (375,375))
            # pygame.draw.rect(screen, black, [350, 350, 100, 100])
            # pygame.draw.circle(screen, black, (400, 300), 50)

class GameObject:

    def __init__(self, x, y, width, height):
        self.x_pos = x
        self.y_pos = y
        

pygame.init()

new_game = Game(title, width, height)
new_game.run_game_loop()
# player_image = pygame.image.load('player.png')
# player_image = pygame.transform.scale(player_image, (50,50))



pygame.quit()
quit()
