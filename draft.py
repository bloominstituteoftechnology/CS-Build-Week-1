import pygame
import copy
import time
from os import system

def find_neighbors(i, j, arr):
    neighbors = []
    MAX = len(arr)
    total = 0

    #Find top left
    if i - 1 >= 0 and j - 1 >= 0:
        neighbors.append(arr[i-1][j-1])
    #Find top middle
    if i - 1 >= 0:
        neighbors.append(arr[i-1][j])
    #Find top right
    if i - 1 >= 0 and j + 1 < MAX:
        neighbors.append(arr[i-1][j+1])
    #Find left
    if j - 1 >= 0:
        neighbors.append(arr[i][j-1])
    #Find right
    if j + 1 < MAX:
        neighbors.append(arr[i][j+1])
    #Find bottom left
    if i + 1 < MAX and j - 1 >= 0:
        neighbors.append(arr[i+1][j-1])
    #Find bottom middle
    if i + 1 < MAX:
        neighbors.append(arr[i+1][j])
    #Find bottom right
    if i + 1 < MAX and j + 1 < MAX:
        neighbors.append(arr[i+1][j+1])

    for num in neighbors:
        total += num

    return total



def main():
    gen = 0
    max = 10
    l = [ [0] * 10 for i in range(max) ]
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

    new_arr = copy.deepcopy(l)

    while True:
        _ = system('cls')
        print(f"GENERATION {gen}")
        for m in new_arr:
            for o in m:
                print(o, end='\t')
            print()

        for y in range(max):
            for x in range(max):
                new_total = find_neighbors(y, x, l)
                if l[y][x] == 1:
                    if new_total < 2 or new_total > 3:
                        new_arr[y][x] = 0
                else:
                    if new_total == 3:
                        new_arr[y][x] = 1

        l = copy.deepcopy(new_arr)
        gen += 1
        time.sleep(1)

if __name__ == '__main__':
    main()
