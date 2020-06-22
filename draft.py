import copy
import time
from os import system
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

def main():
    gen = 0
    max = 100
    l = [ [0] * max for i in range(max) ]

    #PyGame
    pygame.init()
    pygame.display.set_caption("Hector Ledesma - Conway's Game of Life")
    screen = pygame.display.set_mode((500, 500))

    size = (500 / max) - 5


    # print(l)
    # l[4][4] = 1
    # l[4][3] = 1
    # l[4][5] = 1

    #glider pattern
    l[4][4] = 1
    l[3][4] = 1
    l[2][4] = 1
    l[2][5] = 1
    l[3][6] = 1

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return 0
        _ = system('cls')
        print(f"GENERATION {gen}")
        print_board(l)
        for i  in range(max):
            for j in range(max):
                pygame.draw.rect(screen, pygame.Color('white'), pygame.Rect(j*(5+size), i*(5+size), size, size))

        pygame.display.flip()
        l = update_board(max, l)
        gen += 1
        time.sleep(1)

if __name__ == '__main__':
    main()
