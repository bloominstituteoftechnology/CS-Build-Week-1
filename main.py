import pygame

def main():

    pygame.init()

    pygame.display.set_caption("minimal program")

    screen = pygame.display.set_mode((1080, 720))

    running = True

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.MOUSEBUTTONUP:
                print(pygame.mouse.get_pos())


if __name__ == "__main__":
    main()