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
                second_window()
            if event.type == pygame.MOUSEBUTTONUP:
                print(pygame.mouse.get_pos())


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