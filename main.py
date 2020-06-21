import pygame

def main():

    BLACK = (0, 0, 0)
    WHITE = (255, 255, 255)

    WIDTH = 20
    HEIGHT = 20
    MARGIN = 5

    pygame.init()

    pygame.display.set_caption("minimal program")

    screen = pygame.display.set_mode((255, 255))
    screen.fill(BLACK)

    running = True

    rect = pygame.Rect((0, 0), (25,25))
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
                second_window()
            if event.type == pygame.MOUSEBUTTONUP:
                print(pygame.mouse.get_pos())

        pygame.draw.rect(screen, pygame.Color('white'), pygame.Rect(0, 0, 100, 100))
        pygame.display.flip()


def second_window():
    pygame.init()

    pygame.display.set_caption("minimal program")

    screen = pygame.display.set_mode((300, 300))

    running = True

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.MOUSEBUTTONUP:
                print("Second window says:")
                print(pygame.mouse.get_pos())

if __name__ == "__main__":
    main()