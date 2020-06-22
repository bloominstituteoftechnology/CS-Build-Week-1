import pygame
import copy

def find_neighbors(i, j, arr):
    neighbors = []

    #Find top left
    if arr[i-1][j-1]:
    return neighbors



def main():
    l = [ [0] * 10 for i in range(10) ]
    # print(l)
    l[4][4] = 1

    find_neighbors(0, 1, l)


if __name__ == '__main__':
    main()
