import copy
import pygame

def find_neighbors(i, j, arr, max):
    neighbors = []
    total = 0

    #Find top left
    if i - 1 >= 0 and j - 1 >= 0:
        neighbors.append(arr[i-1][j-1])
    #Find top middle
    if i - 1 >= 0:
        neighbors.append(arr[i-1][j])
    #Find top right
    if i - 1 >= 0 and j + 1 < max:
        neighbors.append(arr[i-1][j+1])
    #Find left
    if j - 1 >= 0:
        neighbors.append(arr[i][j-1])
    #Find right
    if j + 1 < max:
        neighbors.append(arr[i][j+1])
    #Find bottom left
    if i + 1 < max and j - 1 >= 0:
        neighbors.append(arr[i+1][j-1])
    #Find bottom middle
    if i + 1 < max:
        neighbors.append(arr[i+1][j])
    #Find bottom right
    if i + 1 < max and j + 1 < max:
        neighbors.append(arr[i+1][j+1])

    for num in neighbors:
        total += num

    return total

def print_board(board):
    for m in board:
        for o in m:
            print(o, end='\t')
        print()

def update_board(max, board):
    # Make a full copy of our board.
    # This allows us to make a proper update,
    # as otherwise we'd be trying to make updates with the wrong values
    new_arr = copy.deepcopy(board)
    for y in range(max):
        for x in range(max):
            # Using values 0 and 1 lets us simply add up all living cells
            # can use this value to apply the rules of conway's game of life very easily
            neighbors = find_neighbors(y, x, board, max)

            # If cell is alive
            if board[y][x] == 1:
                if neighbors < 2 or neighbors > 3:
                    new_arr[y][x] = 0
            # If cell is dead
            else:
                if neighbors == 3:
                    new_arr[y][x] = 1
    return new_arr

def clear_board(max):
    empty = [ [0] * max for i in range(max) ]
    return empty

def board_preset(option, max):
    mid = int(max / 2 - 1)
    preset = clear_board(max)
    # Glider preset
    if option is 1:
        preset[mid][mid] = 1
        preset[mid - 1][mid] = 1
        preset[mid - 2][mid] = 1
        preset[mid - 2][mid + 1] = 1
        preset[mid - 1][mid + 2] = 1
    # --- preset
    elif option is 2:
        preset[mid][mid] = 1
        preset[mid][mid-1] = 1
        preset[mid][mid+1] = 1
    # Small Exploder preset
    elif option is 3:
        preset[mid][mid] = 1
        preset[mid-1][mid] = 1
        preset[mid][mid-1] = 1
        preset[mid][mid+1] = 1
        preset[mid+1][mid-1] = 1
        preset[mid+1][mid+1] = 1
        preset[mid+2][mid] = 1
    return preset


def main():
    gen = 0
    max = 25
    l = [ [0] * max for i in range(max) ]
    WINDOW = 500
    CELL_SIZE = int(WINDOW / max) - 5
    BOTTOM_PADDING = int(WINDOW / 5)
    TOP_PADDING = CELL_SIZE * 3
    BUTTON_SIZE = int(BOTTOM_PADDING / 3)

    CLEAR_BUTTON = pygame.Rect(WINDOW - int(BUTTON_SIZE * 2 + 25)*2, WINDOW + (BUTTON_SIZE) + TOP_PADDING, BUTTON_SIZE * 2, BUTTON_SIZE)
    PLAYBACK_BUTTON = pygame.Rect(WINDOW - int(BUTTON_SIZE * 2) - 25, WINDOW + (BUTTON_SIZE) + TOP_PADDING, BUTTON_SIZE * 2, BUTTON_SIZE)
    PRESET_BUTTON1 = pygame.Rect(20, WINDOW + BUTTON_SIZE + TOP_PADDING, BUTTON_SIZE, BUTTON_SIZE)
    PRESET_BUTTON2 = pygame.Rect(40 + BUTTON_SIZE, WINDOW + BUTTON_SIZE + TOP_PADDING, BUTTON_SIZE, BUTTON_SIZE)
    PRESET_BUTTON3 = pygame.Rect(60 + BUTTON_SIZE * 2, WINDOW + BUTTON_SIZE + TOP_PADDING, BUTTON_SIZE, BUTTON_SIZE)

    #PyGame
    pygame.init()
    pygame.display.set_caption("Hector Ledesma - Conway's Game of Life")
    screen = pygame.display.set_mode((WINDOW, WINDOW + BOTTOM_PADDING + TOP_PADDING))

    edit = True

    while True:
        screen.fill((255,0,0))
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return 0
            if event.type == pygame.MOUSEBUTTONUP:
                pos = pygame.mouse.get_pos()
                x = pos[0]
                y = pos[1]
                if PLAYBACK_BUTTON.collidepoint(x, y):
                    print(f"X: {x} Y: {y}")
                    edit = not edit
                elif edit and CLEAR_BUTTON.collidepoint(x,y):
                    l = clear_board(max)
                elif edit and y < WINDOW + TOP_PADDING and y > TOP_PADDING:
                    x2 = int(x / (CELL_SIZE + 5))
                    y2 = int((y - TOP_PADDING) / (CELL_SIZE + 5))
                    print(f"X:{x2} Y2:{y} Y2:{y2}")
                    l[y2][x2] = 0 if l[y2][x2] is 1 else 1
                elif edit and (PRESET_BUTTON1.collidepoint(x, y) or PRESET_BUTTON2.collidepoint(x, y) or PRESET_BUTTON3.collidepoint(x, y)):
                    if PRESET_BUTTON1.collidepoint(x, y):
                        l = board_preset(1, max)
                    elif PRESET_BUTTON2.collidepoint(x, y):
                        l = board_preset(2, max)
                    elif PRESET_BUTTON3.collidepoint(x, y):
                        l = board_preset(3, max)


        for i  in range(max):
            for j in range(max):
                color = 'magenta' if l[i][j] == 1 else 'gold'
                pygame.draw.rect(screen, pygame.Color(color), pygame.Rect(j*(5+CELL_SIZE), i*(5+CELL_SIZE) + TOP_PADDING, CELL_SIZE, CELL_SIZE))

        if edit:
            pass

        else:
            l = update_board(max, l)
            gen += 1
            pygame.time.wait(1000)

        font = pygame.font.SysFont('Arial', int(WINDOW * 0.050))
        text_surface = font.render(f'Generation: {gen}', True, (255, 255, 255))
        text_rect = text_surface.get_rect()
        text_rect.centery = TOP_PADDING/2
        text_rect.left = 20
        screen.blit(text_surface, text_rect)

        pygame.draw.rect(screen, pygame.Color('white'), PLAYBACK_BUTTON)
        pygame.draw.rect(screen, pygame.Color('white'), CLEAR_BUTTON)
        pygame.draw.rect(screen, pygame.Color('white'), PRESET_BUTTON1)
        pygame.draw.rect(screen, pygame.Color('white'), PRESET_BUTTON2)
        pygame.draw.rect(screen, pygame.Color('white'), PRESET_BUTTON3)
        pygame.display.update()

if __name__ == '__main__':
    main()
